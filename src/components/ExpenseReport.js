import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Constants from '../res/strings';
import CustomTable from './shared/CustomTable';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from '../res/styles/ExpenseReport.style';
import { getFilteredExpenses } from '../redux/actions/FilteredExpenseServiceAction';
import { LIGHT_GREEN }from '../res/color';


class ExpenseReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedCategory: undefined,
            selectedExpenseType: undefined,
            isDatePickerVisible: false,
            startDate: Constants.START_DATE,
            endDate: Constants.END_DATE,
            selectedDate: undefined,
            filterFocus: false,
        }
        this.tableHead = [Constants.EXPENSE_TYPE, Constants.DATE, Constants.AMOUNT];
        this.categories = [Constants.FARM, Constants.SHOP]
        this.shopExpenseTypes = ['Utility Bill', 'Workers Wage', 'Shop Rent'];
        this.farmExpenseTypes = ['Utility Bill', 'Workers Wage', 'Cows Food', 'Workers Lunch', 'Maintainence'];
        this.categoryModal = null;
        this.expenseTypeModal = null;
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

    }

    componentDidMount() {
        this.props.getFilteredExpenses({});
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const update = {}; 
            if(!nextProps.loading){
                let dat = [];
                nextProps.response.map(d => {
                    dat.push([d.type, d.date.split('T')[0], d.amount]);
                }); 
                update.data = dat;
            }
        return update;
    }
   

    showDatePicker() {
        this.setState(() => ({
            isDatePickerVisible: true,
            defaultIndex: -1
        }));
    }

    hideDatePicker() {
        this.setState(() => ({
            isDatePickerVisible: false
        }));
    }

    handleConfirm(date) {
        if(this.state.selectedDate === Constants.START_DATE) {
            this.setState(() => ({
                startDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }));
        }
        else {
            this.setState(() => ({
                endDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            }));
        }
        this.props.getFilteredExpenses({
            category: this.state.selectedCategory? this.state.selectedCategory: null,
            expense: this.state.selectedExpenseType? this.state.selectedExpenseType: null,
            startDate: this.state.startDate !== Constants.START_DATE? this.state.startDate: null,
            endDate: this.state.endDate !== Constants.END_DATE? this.state.endDate: null
        });
        this.hideDatePicker();
    }

    toggleFilter() {
        this.setState((state) => ({
            filterFocus: !state.filterFocus
        })) 
    }

    clearFilters() {
        this.setState(() => ({
            selectedCategory: undefined,
            startDate: Constants.START_DATE,
            endDate: Constants.END_DATE,
            selectedDate: undefined,
            selectedExpenseType: undefined,
            
        }));
        this.props.getFilteredExpenses({});
        this.categoryModal.select(-1);
        this.expenseTypeModal.select(-1);
    }
    
    render() {
        return(
            <View style = {styles.container}>
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                    maximumDate = {new Date()}
                    minimumDate = {this.state.selectedDate === Constants.END_DATE?
                        this.state.startDate === Constants.START_DATE? null: new Date(this.state.startDate)
                        : null
                    }
                    
                />
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                        onPress = {this.toggleFilter}>
                        <View style = {this.state.filterFocus? styles.focusButton: styles.noFocusButton}>
                            <Text style = {this.state.filterFocus? styles.focusText: styles.noFocusText}>Filters</Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.filterFocus && <TouchableOpacity
                        onPress = {this.clearFilters}>
                        <View style = {styles.clearFilterButton}>
                            <Text style = {styles.clearFilterText}>Clear Filters</Text>
                        </View>
                    </TouchableOpacity>}
                </View>
                {
                    this.state.filterFocus &&  <View style = {styles.filter}>
                    <View style = {styles.pickerStyle}>
                        
                        <ModalDropdown 
                            options={this.categories}
                            textStyle = {styles.text}
                            dropdownTextStyle = {styles.text}
                            isFullWidth = {true}
                            onSelect = {(idx) => {
                                this.expenseTypeModal && this.expenseTypeModal.select(-1);
                                this.setState(() => ({
                                    selectedCategory: this.categories[idx]
                                }));
                                this.props.getFilteredExpenses({
                                    category: this.categories[idx],
                                    expense: this.state.selectedExpenseType? this.state.selectedExpenseType: null,
                                    startDate: this.state.startDate !== Constants.START_DATE? this.state.startDate: null,
                                    endDate: this.state.endDate !== Constants.END_DATE? this.state.endDate: null
                                });
                            }}
                            ref = { (ref) => this.categoryModal = ref}
                            defaultValue = {'select category'}
                            
                        />
                    </View>
                    <TouchableOpacity
                        style = {{height: 70}}
                        disabled = {this.state.startDate === Constants.START_DATE?false:true}
                        onPress = {() => {
                            this.setState(() => ({
                                selectedDate: Constants.START_DATE,
                            }))
                            this.showDatePicker()
                        }}
                    >
                        <Text style = {[styles.date, this.state.startDate === Constants.START_DATE?null: styles.disabled]}>
                            {this.state.startDate}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {{height: 70}}
                        disabled = {this.state.startDate === Constants.START_DATE?true:false}
                         onPress = {() => {
                            this.setState(() => ({
                                selectedDate: Constants.END_DATE
                            }))
                            this.showDatePicker()
                        }} 
                    >
                        <Text style = {[styles.date, this.state.startDate === Constants.START_DATE?styles.disabled: null]} >
                            {this.state.endDate}
                        </Text>
                    </TouchableOpacity>
                    {<View style = {[styles.pickerStyle, this.state.selectedCategory?null:styles.disabled]}
                    pointerEvents = {this.state.selectedCategory?'auto': 'none'}>
                        
                        <ModalDropdown 
                            options={this.state.selectedCategory === Constants.FARM? this.farmExpenseTypes: this.shopExpenseTypes}
                            textStyle = {styles.text}
                            dropdownTextStyle = {styles.text}
                            isFullWidth = {true}
                            onSelect = {(idx) => {
                                this.setState(() => ({
                                    selectedExpenseType: this.state.selectedCategory === Constants.FARM? this.farmExpenseTypes[idx]: this.shopExpenseTypes[idx]
                                }));
                                this.props.getFilteredExpenses({
                                    category: this.state.selectedCategory? this.state.selectedCategory: null,
                                    expense: Constants.FARM? this.farmExpenseTypes[idx]: this.shopExpenseTypes[idx],
                                    startDate: this.state.startDate !== Constants.START_DATE? this.state.startDate: null,
                                    endDate: this.state.endDate !== Constants.END_DATE? this.state.endDate: null
                                });
                            }}
                            ref = { (ref) => this.expenseTypeModal = ref}
                            defaultValue = {'select expense'}
                            
                        />
                    </View>}
                </View>
                }
                
                <View style = {styles.report}>
                    <Text style = {styles.heading}>{Constants.EXPENSE_REPORT}</Text>
                    <CustomTable tableHead = {this.tableHead} data = {this.state.data}/>
                </View>
                {this.props.loading &&
                    <View style = {styles.loading}>
                        <ActivityIndicator size="large" color={LIGHT_GREEN}/>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.FilterExpenseReducer.loading,
    error: state.FilterExpenseReducer.error,
    response: state.FilterExpenseReducer.data,

});

const mapDispatchToProps = (dispatch) => ({
    getFilteredExpenses: (filters) => dispatch(getFilteredExpenses(filters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseReport);