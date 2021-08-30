import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import SearchableDropDown from 'react-native-searchable-dropdown';
import RNSearchablePicker from 'react-native-searchable-picker';
import * as Constants from '../res/strings';
import * as Colors from '../res/color';
import CustomTable from './shared/CustomTable';
import { FloatingAction } from 'react-native-floating-action';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionButton from './shared/ActionButton';
import { Picker } from '@react-native-picker/picker';
import styles from '../res/styles/MilkScreen.style';
import { LIGHT_GREEN } from '../res/color';
import { getAllMilkAmounts } from '../redux/actions/MilkGetAction';
import { addMilkQuantity } from '../redux/actions/MilkPostAction';
import { getAllCows } from '../redux/actions/CowsGetAction';

class MilkScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cows: [],
            milkQuantity: '',
            date: Constants.SELECT_DATE,
            milkData: [],
            isModalVisible: false,
            selectedCow: undefined,
            isDatePickerVisible: false
        }
        this.floatingAction = null;
        this.tableHead = [Constants.COW_ID, Constants.NAME, Constants.MILK_QUANTITY, Constants.DATE];
        this.showModal = this.showModal.bind(this);
        this.addMilk = this.addMilk.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.tableComponent = null;
    }
 
    componentDidMount() {
        this.props.getAllCows();
        this.props.getAllMilkAmounts();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.cows.length === 0 || prevState.milkData.length === 0) {
            const update = {};
            if(!nextProps.cowsGetServiceIsLoading){
                let cowsDetail = [];
                nextProps.cowsGetServiceResponse.map(cow => {
                    cowsDetail.push({label: cow.name + " (" + cow.id.toString() + ")", value: cow.id.toString(), date: cow.entranceDate, name: cow.name});
                }); 
                update.cows = cowsDetail;
            }
            if(!nextProps.milkGetServiceIsLoading) {
                let data = [];
                nextProps.milkGetServiceResponse.map(milk => {
                    data.push([milk.cowId, milk.name, milk.amount, milk.date.split('T')[0]]);
                });
                update.milkData = data;
            }
            return update;
        }
        return null;
    }

    showModal() {
        this.setState({
            isModalVisible: true
        });
    }

    addMilk() {
        console.log(this.state.selectedCow);
        if(this.state.cows.length === 0) {
            Alert.alert("Error", "No cow is added yet.");
        }
        else if(this.state.milkQuantity && this.state.date !== Constants.SELECT_DATE) {
            if(this.state.selectedCow === undefined) {
                Alert.alert("Error", "Please select a valid cow.");
            }
            else {
            this.props.addMilkQuantity({cowId: this.state.selectedCow.value, name: this.state.selectedCow.name, amount: this.state.milkQuantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), date: this.state.date});
            this.setState((state) => ({
                milkData: state.milkData.concat([[state.selectedCow.value, state.selectedCow.name, state.milkQuantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), state.date]]),
                milkQuantity: '',
                date: Constants.SELECT_DATE
            }))
            this.hideModal();
        }
        }
        else {
            Alert.alert("Error", "Please fill all fields.");
        }
    }

    hideModal() {
        this.floatingAction.animateButton();
        this.setState({
            isModalVisible: false
        });
    }

    showDatePicker() {
        this.setState({
            isDatePickerVisible: true
        });
    };

    hideDatePicker() {
        this.setState({
            isDatePickerVisible: false
        });
    };

    handleConfirm(d) {
        this.setState({
            date: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        });
        this.hideDatePicker();
    };
    render() {
        return (
            <View style = {styles.container}>
                <Text style = {styles.heading}>{Constants.MILK_DETAILS}</Text>
                <CustomTable tableHead = {this.tableHead} data = {this.state.milkData}/>
                <FloatingAction
                    ref={(ref) => { this.floatingAction = ref; }}
                    color = {Colors.LIGHT_GREEN}
                    showBackground = {false}
                    onPressMain = {this.showModal}
                />
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                    maximumDate = {new Date()}
                    minimumDate = {this.state.selectedCow? new Date(this.state.selectedCow.date): null}
                    
                />
                <View>
                    <Modal isVisible = {this.state.isModalVisible} animationIn = 'zoomIn' animationOut = 'zoomOut'>
                        <View style={styles.modal}>
                            <Text style = {styles.modalHeading}>Add Milk</Text>
                            <View>
                            <Text style = {styles.modalLabel}>{Constants.SELECT_COW}</Text>
                                <View style = {styles.pickerStyle}>
                                    <RNSearchablePicker 
                                        onSelect = {(item) => {
                                            this.setState((state) => ({
                                                selectedCow: item
                                            }));
                                        }}
                                        data = {this.state.cows}
                                        containerStyles={{marginHorizontal: 10}}
                                        placeholder='Select a cow'
                                    />
                                </View>
                                <Text style = {styles.modalLabel}>{Constants.MILK_QUANTITY}</Text>
                                <TextInput 
                                    style = {styles.inputField}
                                    defaultValue = {this.state.milkQuantity}
                                    keyboardType = 'numeric'
                                    maxLength = {10}
                                    onChangeText = {text => {
                                        this.setState({
                                            milkQuantity: text
                                        });
                                    }}
                                />
                                <Text style = {styles.modalLabel}>{Constants.DATE}</Text>
                                <Text
                                    style = {styles.date}
                                    onPress = {this.showDatePicker} 
                                >
                                    {this.state.date}
                                </Text>
                                <View style = {styles.buttonContainer}>
                                    <View style = {styles.button}>
                                        <ActionButton title = {Constants.CANCEL} handlePress = {this.hideModal}/>
                                    </View>
                                    <View style = {styles.button}>
                                        <ActionButton title = {Constants.ADD} handlePress = {this.addMilk}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                {(this.props.milkPostServiceIsLoading || this.props.cowsGetServiceIsLoading || this.props.milkGetServiceIsLoading) &&
                    <View style = {styles.loading}>
                        <ActivityIndicator size="large" color={LIGHT_GREEN}/>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    milkPostServiceIsLoading: state.MilkPostReducer.loading,
    milkPostServiceError: state.MilkPostReducer.error,
    milkPostServiceResponse: state.MilkPostReducer.data,
    cowsGetServiceIsLoading: state.CowsGetReducer.cowsGetServiceIsLoading,
    cowsGetServiceError: state.CowsGetReducer.cowsGetServiceError,
    cowsGetServiceResponse: state.CowsGetReducer.cowsGetServiceResponse,
    milkGetServiceIsLoading: state.MilkGetReducer.milkGetServiceIsLoading,
    milkGetServiceError: state.MilkGetReducer.milkGetServiceError,
    milkGetServiceResponse: state.MilkGetReducer.milkGetServiceResponse,

});

const mapDispatchToProps = (dispatch) => ({
    addMilkQuantity: (milkQuantity) => dispatch(addMilkQuantity(milkQuantity)),
    getAllCows: () => dispatch(getAllCows()),
    getAllMilkAmounts: () => dispatch(getAllMilkAmounts())
});



export default connect(mapStateToProps, mapDispatchToProps)(MilkScreen);