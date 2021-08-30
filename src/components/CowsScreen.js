import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Alert, ActivityIndicator } from 'react-native';
import * as Constants from '../res/strings';
import * as Colors from '../res/color';
import CustomTable from './shared/CustomTable';
import { FloatingAction } from 'react-native-floating-action';
import Modal from 'react-native-modal';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ActionButton from './shared/ActionButton';
import styles from '../res/styles/CowsScreen.style';
import { postCow } from '../redux/actions/CowPostAction';
import { getAllCows } from '../redux/actions/CowsGetAction';
import { LIGHT_GREEN } from '../res/color';

class CowsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: Constants.SELECT_DATE,
            cowsData: [],
            isModalVisible: false,
            isDatePickerVisible: false,
        }
        this.floatingAction = null;
        this.tableHead = [Constants.ID, Constants.NAME, Constants.ENTRANCE_DATE];
        this.showModal = this.showModal.bind(this);
        this.addCow = this.addCow.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    
    componentDidMount() {
        this.props.getAllCows();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.cowsData.length === 0) {
            const update = {};
            if(!nextProps.cowsGetServiceIsLoading){
                let data = [];
                nextProps.cowsGetServiceResponse.map(cow => {
                    data.push([cow.id, cow.name, cow.entranceDate.split('T')[0]]);
                }); 
                update.cowsData = data;
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


    async addCow() {
        if(this.state.name && this.state.date !== Constants.SELECT_DATE) {
            await this.props.addCow({name: this.state.name, entranceDate: this.state.date});
            //while(this.props.postServiceIsLoading);
            //console.log("response", response);
            this.setState((state) => ({
                cowsData: state.cowsData.concat([[this.props.postServiceResponse.id, this.state.name, this.state.date]]),
                name: '',
                date: Constants.SELECT_DATE
            }));
            this.hideModal();
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
                <Text style = {styles.heading}>{Constants.COWS_DETAILS}</Text>
                <CustomTable tableHead = {this.tableHead} data = {this.state.cowsData}/>
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
                    
                />
                <View>
                    <Modal isVisible = {this.state.isModalVisible} animationIn = 'zoomIn' animationOut = 'zoomOut'>
                        <View style={styles.modal}>
                            <Text style = {styles.modalHeading}>Add Cow</Text>
                            <View>
                                <Text style = {styles.modalLabel}>{Constants.NAME}</Text>
                                <TextInput 
                                    style = {styles.inputField}
                                    defaultValue = {this.state.name}
                                    onChangeText = {text => {
                                        this.setState({
                                            name: text
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
                                        <ActionButton title = {Constants.ADD} handlePress = {this.addCow}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                {(this.props.postServiceIsLoading || this.props.cowsGetServiceIsLoading) &&
                    <View style = {styles.loading}>
                        <ActivityIndicator size="large" color={LIGHT_GREEN}/>
                    </View>
                }
                
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    postServiceIsLoading: state.CowPostReducer.loading,
    postServiceError: state.CowPostReducer.error,
    postServiceResponse: state.CowPostReducer.data,
    cowsGetServiceIsLoading: state.CowsGetReducer.cowsGetServiceIsLoading,
    cowsGetServiceError: state.CowsGetReducer.cowsGetServiceError,
    cowsGetServiceResponse: state.CowsGetReducer.cowsGetServiceResponse,

});

const mapDispatchToProps = (dispatch) => ({
    addCow: (cow) => dispatch(postCow(cow)),
    getAllCows: () => dispatch(getAllCows()),
});


export default connect(mapStateToProps, mapDispatchToProps)(CowsScreen);