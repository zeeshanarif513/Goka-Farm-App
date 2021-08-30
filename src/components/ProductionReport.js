import React, { Component } from 'react';
import { connect } from 'react-redux';
import RNSearchablePicker from 'react-native-searchable-picker';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Constants from '../res/strings';
import CustomTable from './shared/CustomTable';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from '../res/styles/ProductionReport.style';
import { getFilteredProduction } from '../redux/actions/ProductionServiceAction';
import { LIGHT_GREEN } from '../res/color';
import { getAllCows } from '../redux/actions/CowsGetAction';


class ProductionReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cows: [],
            data: [],
            selectedCow: undefined,
            isDatePickerVisible: false,
            startDate: Constants.START_DATE,
            endDate: Constants.END_DATE,
            selectedDate: undefined,
            filterFocus: false
        }
        this.picker = null;
        this.tableHead = [Constants.ID, Constants.NAME, Constants.DATE, Constants.MILK_QUANTITY];
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

    }

    componentDidMount(){
        this.props.getFilteredProduction({});
        this.props.getAllCows();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const update = {};
        if(!nextProps.loading){
            let dat = [];
            nextProps.response.map(d => {
                dat.push([d.id, d.name, d.date.split('T')[0], d.amount]);
            }); 
            update.data = dat;
        }
        if(!nextProps.cowsGetServiceIsLoading){
            let d = [];
            nextProps.cowsGetServiceResponse.map(cow => {
                d.push({label: cow.name + ' (' + cow.id + ')', value: cow.name + ' (' + cow.id + ')'});
            });  
            update.cows = d;
        }
            
        return update;
    }

    showDatePicker() {
        this.setState(() => ({
            isDatePickerVisible: true
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
        this.props.getFilteredProduction({
            name: this.state.selectedCow? this.state.selectedCow.value.split(' ')[0]: null,
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
            selectedCow: undefined,
            startDate: Constants.START_DATE,
            endDate: Constants.END_DATE,
            selectedDate: undefined,
        }));
        this.props.getFilteredProduction({});
        //this.filter.forceUpdate();
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
                    <View style = {styles.pickerStyle}
                   >
                        {<RNSearchablePicker 
                            onSelect = {(item) => {
                                this.setState((state) => ({
                                    selectedCow: item
                                }));
                                this.props.getFilteredProduction({
                                    name: item.value.split(' ')[0],
                                    startDate: this.state.startDate !== Constants.START_DATE? this.state.startDate: null,
                                    endDate: this.state.endDate !== Constants.END_DATE? this.state.endDate: null
                                });
                            }}
                            data = {this.state.cows}
                            containerStyles={{marginHorizontal: 10}}
                            placeholder='Select a cow'
                            itemStyles = {styles.pickerItem}
                        />}
                    </View>
                    <TouchableOpacity
                        style = {{height: 70}}
                        disabled = {this.state.startDate === Constants.START_DATE?false:true}
                        onPress = {() => {
                            this.setState(() => ({
                                selectedDate: Constants.START_DATE
                            }))
                            this.showDatePicker()
                        }}
                    >
                        <Text style = {[styles.date, this.state.startDate === Constants.START_DATE?null: styles.disabledDate]}>
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
                        <Text style = {[styles.date, this.state.startDate === Constants.START_DATE?styles.disabledDate: null]} >
                            {this.state.endDate}
                        </Text>
                    </TouchableOpacity>
                </View>
                }
                
                <View style = {styles.report}>
                    <Text style = {styles.heading}>{Constants.PRODUCTION_REPORT}</Text>
                    <CustomTable tableHead = {this.tableHead} data = {this.state.data}/>
                </View>
                {(this.props.loading || this.props.cowsGetServiceIsLoading)&&
                    <View style = {styles.loading}>
                        <ActivityIndicator size="large" color={LIGHT_GREEN}/>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.ProductionReducer.loading,
    error: state.ProductionReducer.error,
    response: state.ProductionReducer.data,
    cowsGetServiceIsLoading: state.CowsGetReducer.cowsGetServiceIsLoading,
    cowsGetServiceError: state.CowsGetReducer.cowsGetServiceError,
    cowsGetServiceResponse: state.CowsGetReducer.cowsGetServiceResponse,

});

const mapDispatchToProps = (dispatch) => ({
    getFilteredProduction: (filters) => dispatch(getFilteredProduction(filters)),
    getAllCows: () => dispatch(getAllCows()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductionReport);