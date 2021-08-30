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
import { Picker } from '@react-native-picker/picker';
import styles from '../res/styles/ExpenseScreen.style';
import { getAllExpenses } from '../redux/actions/ExpenseGetAction';
import { postExpense } from '../redux/actions/ExpensePostAction';
import { LIGHT_GREEN } from '../res/color';

class ExpenseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: Constants.FARM,
            amount: undefined,
            date: Constants.SELECT_DATE,
            farmData: [],
            shopData: [],
            isModalVisible: false,
            selectedExpense: 'Utility Bill',
            isDatePickerVisible: false
        }
        this.shopExpenseTypes = ['Utility Bill', 'Workers Wage', 'Shop Rent'];
        this.farmExpenseTypes = ['Utility Bill', 'Workers Wage', 'Cows Food', 'Workers Lunch', 'Maintainence'];
        this.floatingAction = null;
        this.tableHead = [Constants.EXPENSE_TYPE, Constants.AMOUNT, Constants.DATE];
        this.showModal = this.showModal.bind(this);
        this.addExpense = this.addExpense.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    componentDidMount() {
        this.props.getAllExpenses();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.farmData.length === 0 || prevState.shopData.length === 0) {
            const update = {};
            if(!nextProps.expenseGetServiceIsLoading){
                let farmExpenses = [];
                let shopExpenses = []
                nextProps.expenseGetServiceResponse.map(expense => {
                    if(expense.category === Constants.FARM) {
                        farmExpenses.push([expense.type, expense.amount, expense.date.split('T')[0]]);
                    }
                    else {
                        shopExpenses.push([expense.type, expense.amount, expense.date.split('T')[0]]);
                    }
                }); 
                update.farmData = farmExpenses;
                update.shopData = shopExpenses;
            }
            return update;
        }
        return null;
    }

    showModal() {
        this.setState({
            isModalVisible: true
        })
    }

    addExpense() {
        if(this.state.amount && this.state.date !== Constants.SELECT_DATE) {
            this.props.postExpense({category: this.state.category, type: this.state.selectedExpense, amount: this.state.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), date: this.state.date});
            this.state.category === Constants.FARM? this.setState((state) => ({ 
                farmData: state.farmData.concat([[this.state.selectedExpense, this.state.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), this.state.date]]) 
            })): this.setState((state) => ({ 
                shopData: state.shopData.concat([[this.state.selectedExpense, this.state.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','), this.state.date]])
            }));
            this.hideModal();
            this.setState({
                amount: '',
                date: Constants.SELECT_DATE
            });
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
                <Text style = {styles.heading}>{Constants.EXPENSES_DETAIL}</Text>
                <View style = {{margin: 12}}>
                    <Text style = {styles.modalLabel}>{Constants.SELECT_CATEGORY}</Text>
                    <View style = {styles.pickerStyle}>
                        <Picker
                            selectedValue = {this.state.category}
                            onValueChange = {(itemvalue, itemIndex) => {
                                this.setState({
                                    category: itemvalue
                                });
                            }
                            }>
                                <Picker.Item label = {Constants.FARM} value = {Constants.FARM} />
                                <Picker.Item label = {Constants.SHOP} value = {Constants.SHOP} />
                        </Picker>
                    </View>
                </View>
                <Text style = {styles.subHeading}>{this.state.category} Details</Text>
                <CustomTable tableHead = {this.tableHead} data = {this.state.category === Constants.FARM? this.state.farmData: this.state.shopData}/>
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
                            <Text style = {styles.modalHeading}>Add Expense</Text>
                            <View>
                            <Text style = {styles.modalLabel}>{Constants.EXPENSE_TYPE}</Text>
                                <View style = {styles.pickerStyle}>
                                    <Picker
                                        selectedValue = {this.state.selectedExpense}
                                        onValueChange = {(itemvalue, itemIndex) => {
                                            this.setState({
                                                selectedExpense: itemvalue
                                            });
                                        }
                                        }>
                                            {
                                                this.state.category === Constants.FARM? this.farmExpenseTypes.map((type, key) => {
                                                    return <Picker.Item label = {type} value = {type} key = {key}/>
                                                }): this.shopExpenseTypes.map((type, key) => {
                                                    return <Picker.Item label = {type} value = {type} key = {key}/>
                                                })
                                            }
                                    </Picker>
                                </View>
                                <Text style = {styles.modalLabel}>{Constants.AMOUNT}</Text>
                                <TextInput 
                                    style = {styles.inputField}
                                    defaultValue = {this.state.amount}
                                    keyboardType = 'numeric'
                                    maxLength = {10}
                                    onChangeText = {text => {
                                        this.setState({
                                            amount: text
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
                                        <ActionButton title = {Constants.ADD} handlePress = {this.addExpense}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                {(this.props.expensePostServiceIsLoading || this.props.expenseGetServiceIsLoading) &&
                    <View style = {styles.loading}>
                        <ActivityIndicator size="large" color={LIGHT_GREEN}/>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    expensePostServiceIsLoading: state.ExpensePostReducer.loading,
    expensePostServiceError: state.ExpensePostReducer.error,
    expensePostServiceResponse: state.ExpensePostReducer.data,
    expenseGetServiceIsLoading: state.ExpenseGetReducer.expenseGetServiceIsLoading,
    expenseGetServiceError: state.ExpenseGetReducer.expenseGetServiceError,
    expenseGetServiceResponse: state.ExpenseGetReducer.expenseGetServiceResponse,

});

const mapDispatchToProps = (dispatch) => ({
    postExpense: (expense) => dispatch(postExpense(expense)),
    getAllExpenses: () => dispatch(getAllExpenses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseScreen);