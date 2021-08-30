import { combineReducers } from "redux";

import CowPostReducer from "./CowPostReducer";
import CowsGetReducer from "./CowsGetReducer";
import MilkPostReducer from "./MilkPostReducer";
import MilkGetReducer from "./MilkGetReducer";
import ExpensePostReducer from "./ExpensePostReducer";
import ExpenseGetReducer from "./ExpenseGetReducer";
import ProductionReducer from "./ProductionReducer";
import FilterExpenseReducer from "./FilterExpenseReducer";
import LoginReducer from "./LoginReducer";

const AppReducers = combineReducers({
    CowPostReducer,
    CowsGetReducer,
    MilkPostReducer,
    MilkGetReducer,
    ExpensePostReducer,
    ExpenseGetReducer,
    ProductionReducer,
    FilterExpenseReducer,
    LoginReducer
});

const RootReducer = (state, action) => {
    return AppReducers(state, action);
}

export default RootReducer;

