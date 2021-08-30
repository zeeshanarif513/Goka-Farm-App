import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import NavigationButton from './shared/NavigationButton';
import styles from '../res/styles/HomeScreen.style';
import { getAllCows } from '../redux/actions/ServiceAction';
import { LIGHT_GREEN  } from '../res/color';

const HomeScreen = ({navigation}) => {
    // useEffect(() => {
    //     props.getAllCows();
    // },[]);
    function gotoCowScreen() {
        navigation.navigate('Cows');
    }
    function gotoMilkScreen() {
        navigation.navigate('Milk Detail');
    }
    function gotoExpensesScreen() {
        navigation.navigate('Expenses');
    }
    function gotoProductionReport() {
        navigation.navigate('Milk Production Report');
    }
    function gotoExpenseReport() {
        navigation.navigate('Expenses Report');
    }
    function gotoPivotChart() {
        navigation.navigate('Pivot Chart');
    }
    const data = [
        {
            image: 'https://img.icons8.com/ios/50/26e07f/cuts-of-beef.png',
            title: 'Add Cow',
            content: 'You can check cows data from here and also add new cow.',
        },
        {
            image: 'https://img.icons8.com/ios/50/26e07f/counter--v1.png',
            title: 'Add Milk Quantity',
            content: 'You can check milk quantity data from here and also add new quantity.',
        },
        {
            image: 'https://img.icons8.com/ios/50/26e07f/reservation-2.png',
            title: 'Add Expense',
            content: 'You can check expenses detial from here and also add new expense.',
        },
        {
            image: 'https://img.icons8.com/windows/32/26e07f/production-in-progress.png',
            title: 'Milk Production Report',
            content: 'You can check filtered reports about milk production.',
        },
        {
            image: 'https://img.icons8.com/ios/50/26e07f/cashbook.png',
            title: 'Expenses Report',
            content: 'You can check filtered reports about all expenses.',
        },
        {
            image: 'https://img.icons8.com/ios/50/26e07f/pivot-table.png',
            title: 'Pivot Chart',
            content: 'You can check pivot table about milk production.',
        }
    ] 
    return (
        <View style = {styles.container}>
            <NavigationButton data = {data[0]} handleClick = {gotoCowScreen}/>
            <NavigationButton data = {data[1]} handleClick = {gotoMilkScreen}/>
            <NavigationButton data = {data[2]} handleClick = {gotoExpensesScreen}/>
            <NavigationButton data = {data[3]} handleClick = {gotoProductionReport}/>
            <NavigationButton data = {data[4]} handleClick = {gotoExpenseReport}/>
            <NavigationButton data = {data[5]} handleClick = {gotoPivotChart}/>
            {/* {props.cowsGetServiceIsLoading &&
            <View style = {styles.loading}>
                <ActivityIndicator size="large" color={LIGHT_GREEN}/>
            </View> }*/}
        
        </View>
        
    );
}

// const mapStateToProps = (state) => ({
//     cowsGetServiceIsLoading: state.CowsGetReducer.cowsGetServiceIsLoading,
//     cowsGetServiceError: state.CowsGetReducer.cowsGetServiceError,
//     cowsGetServiceResponse: state.CowsGetReducer.cowsGetServiceResponse,

// });

// const mapDispatchToProps = (dispatch) => ({
//     getAllCows: () => dispatch(getAllCows()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeScreen;