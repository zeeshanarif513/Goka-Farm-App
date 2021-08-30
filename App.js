import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import MainStackNavigator from './src/navigator/MainStackNavigator';
import ProductionReport from './src/components/ProductionReport';
import ExpenseReport from './src/components/ExpenseReport';
import PivotChart from './src/components/PivotChart';



const App = () => {
  return (
    <Provider store = {Store}>
      <MainStackNavigator />
    </Provider>
  );
};

export default App;
