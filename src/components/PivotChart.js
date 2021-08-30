import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Constants from '../res/strings';
import PivotTable from './PivotTable';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Colors from '../res/color';
import { getFilteredProduction } from '../redux/actions/ProductionServiceAction';
import { getAllCows } from '../redux/actions/CowsGetAction';
import styles from '../res/styles/PivotChart.style';

class PivotChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cows: [],
            data: [],
            isDatePickerVisible: false,
            startDate: Constants.START_DATE,
            endDate: Constants.END_DATE,
            selectedDate: undefined,
            rangeFocus: false,
            tableHead: []
        }
        this.picker = null;
        this.showDatePicker = this.showDatePicker.bind(this);
        this.hideDatePicker = this.hideDatePicker.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.toggleRange = this.toggleRange.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

    }

    componentDidMount(){
        this.props.getFilteredProduction({});
        this.props.getAllCows();
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const update = {};
        if(prevState.startDate !== Constants.START_DATE && prevState.endDate !== Constants.END_DATE && !nextProps.loading && !nextProps.cowsGetServiceIsLoading) {
            const sumArray = (array) => {
                const newArray = [];
                array.forEach(sub => {
                    sub.forEach((num, index) => {
                        if(newArray[index]){
                            newArray[index] += num;
                        }else{
                            newArray[index] = num;
                        }
                    });
                });
                return newArray;
                }
                const sliceFirstColumn = (arr) => {
                let res = arr.map(val => {
                    return val.slice(1);
                });
                return res;
                }
            let result = [];
            let head = ["Names"];
            for (var d = new Date(prevState.startDate); d <= new Date(prevState.endDate); d = new Date(d.setDate(d.getDate() + 1))) {
                head.push((d.getMonth() + 1)+ "/" + d.getDate());
            }
            head.push("Total");
            update.tableHead = head;
            nextProps.cowsGetServiceResponse.map(cow => {
                let row = [cow.name];
                
                for (var d = new Date(prevState.startDate); d <= new Date(prevState.endDate); d = new Date(d.setDate(d.getDate() + 1))) {
                    let q = 0;
                    nextProps.response.map(milk => {
                        let date = new Date(milk.date);
                        date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        let loopDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
                        if(cow.id === milk.cowId && date === loopDate) {
                            q = q + parseInt(milk.amount);
                        }
                    });
                    row.push(q);
                }
                row.push(row.slice(1).reduce((a,b) => a + b, 0));
                result.push(row);
                
            });
            let res = sliceFirstColumn(result);
            let sum = sumArray(res);
            let avg = sum.map( e => Math.round((e / res.length) * 10) / 10);
            sum.unshift("Total");
            avg.unshift("Average");
            result.push(sum);
            result.push(avg);
            console.log();
            console.log("result: ", result);
            update.data = result;
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
        this.hideDatePicker();
    }

    toggleRange() {
        this.setState((state) => ({
            rangeFocus: !state.rangeFocus
        })) 
    }

    clearFilters() {
        this.setState(() => ({
            data: [],
            tableHead: [],
            startDate: Constants.START_DATE,
            endDate: Constants.END_DATE,
        }));
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
                        onPress = {this.toggleRange}>
                        <View style = {this.state.rangeFocus? styles.focusButton: styles.noFocusButton}>
                            <Text style = {this.state.rangeFocus? styles.focusText: styles.noFocusText}>Range</Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.rangeFocus && <TouchableOpacity
                        onPress = {this.clearFilters}>
                        <View style = {styles.clearRangeButton}>
                            <Text style = {styles.clearRangeText}>Clear</Text>
                        </View>
                    </TouchableOpacity>}
                    
                </View>
                {
                    this.state.rangeFocus &&  <View style = {styles.range}>

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
                    <Text style = {styles.heading}>{Constants.PIVOT_CHART}</Text>
                    {
                        (this.state.startDate === Constants.START_DATE || this.state.endDate === Constants.END_DATE)? 
                            <Text style = {styles.text}>Please select range</Text>:
                            <PivotTable tableHead = {this.state.tableHead} data = {this.state.data}/>
                    }
                    
                </View>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(PivotChart);