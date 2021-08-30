import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import Icon from 'react-native-vector-icons/Entypo';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import HomeScreen from '../components/HomeScreen';
import CowsScreen from '../components/CowsScreen';
import MilkScreen from '../components/MilkScreen';
import ExpenseScreen from '../components/ExpenseScreen';
import ProductionReport from '../components/ProductionReport';
import ExpenseReport from '../components/ExpenseReport';
import PivotChart from '../components/PivotChart';
import * as Colors from '../res/color';
import { Text } from 'react-native';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName = 'Login'
                screenOptions = {{
                    headerTintColor: Colors.LIGHT_GREEN,
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}>
                <Stack.Screen name = 'Login' component = {Login} />
                <Stack.Screen name = 'Sign Up' component = {SignUp}/>
                <Stack.Screen 
                    name = 'Home' 
                    component = {HomeScreen}
                    options = {({navigation}) => ({
                        headerRight: () => (
                            <Text 
                                style = {
                                    {
                                        backgroundColor: Colors.LIGHT_GREEN,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginRight: 5,
                                        color: Colors.WHITE,
                                        fontWeight: 'bold'
                                    }
                                }
                                onPress = {() => navigation.replace('Login')}
                            >
                                Logout
                            </Text>   
                        )
                    })}
                />
                <Stack.Screen 
                    name = 'Cows'
                    component = {CowsScreen}
                    options = {({navigation}) => ({
                        headerRight: () => (
                            <Text 
                                style = {
                                    {
                                        backgroundColor: Colors.LIGHT_GREEN,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginRight: 5,
                                        color: Colors.WHITE,
                                        fontWeight: 'bold'
                                    }
                                }
                                onPress = {() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Login'}]
                                    })
                                    // navigation.navigate('Login')
                                }}
                            >
                                Logout
                            </Text>   
                        )
                    })}
                />
                <Stack.Screen 
                    name = 'Expenses' 
                    component = {ExpenseScreen}
                    options = {({navigation}) => ({
                        headerRight: () => (
                            <Text 
                                style = {
                                    {
                                        backgroundColor: Colors.LIGHT_GREEN,
                                        padding: 10,
                                        borderRadius: 5,
                                        marginRight: 5,
                                        color: Colors.WHITE,
                                        fontWeight: 'bold'
                                    }
                                }
                                onPress = {() =>{
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Login'}]
                                    })
                                    // navigation.navigate('Login')
                                }}
                            >
                                Logout
                            </Text>   
                        )
                    })}
                />
                <Stack.Screen 
                name = 'Milk Detail' 
                component = {MilkScreen}
                options = {({navigation}) => ({
                    headerRight: () => (
                        <Text 
                            style = {
                                {
                                    backgroundColor: Colors.LIGHT_GREEN,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginRight: 5,
                                    color: Colors.WHITE,
                                    fontWeight: 'bold'
                                }
                            }
                            onPress = {() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login'}]
                                })
                                // navigation.navigate('Login')
                            }}
                        >
                            Logout
                        </Text>   
                    )
                })}
            />
            <Stack.Screen 
                name = 'Milk Production Report' 
                component = {ProductionReport}
                options = {({navigation}) => ({
                    headerRight: () => (
                        <Text 
                            style = {
                                {
                                    backgroundColor: Colors.LIGHT_GREEN,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginRight: 5,
                                    color: Colors.WHITE,
                                    fontWeight: 'bold'
                                }
                            }
                            onPress = {() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login'}]
                                })
                                // navigation.navigate('Login')
                            }}
                        >
                            Logout
                        </Text>   
                    )
                })}
            />
            <Stack.Screen 
                name = 'Expenses Report' 
                component = {ExpenseReport}
                options = {({navigation}) => ({
                    headerRight: () => (
                        <Text 
                            style = {
                                {
                                    backgroundColor: Colors.LIGHT_GREEN,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginRight: 5,
                                    color: Colors.WHITE,
                                    fontWeight: 'bold'
                                }
                            }
                            onPress = {() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login'}]
                                })
                                // navigation.navigate('Login')
                            }}
                        >
                            Logout
                        </Text>   
                    )
                })}
            />
            <Stack.Screen 
                name = 'Pivot Chart' 
                component = {PivotChart}
                options = {({navigation}) => ({
                    headerRight: () => (
                        <Text 
                            style = {
                                {
                                    backgroundColor: Colors.LIGHT_GREEN,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginRight: 5,
                                    color: Colors.WHITE,
                                    fontWeight: 'bold'
                                }
                            }
                            onPress = {() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login'}]
                                })
                                // navigation.navigate('Login')
                            }}
                        >
                            Logout
                        </Text>   
                    )
                })}
            />
            </Stack.Navigator>
            
        </NavigationContainer>
    );
}

export default MainStackNavigator;