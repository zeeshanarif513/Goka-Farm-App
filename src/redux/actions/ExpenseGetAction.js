import * as ActionTypes from '../ActionTypes';
import * as ExpenseApi from '../../GokaFarmApi/ExpenseApi';

export const ExpenseGetActionPending = () => (
    {
        type: ActionTypes.EXPENSE_GET_REQUEST_PENDING
    }
)

export const ExpenseGetActionError = (error) => (
    {
        type: ActionTypes.EXPENSE_GET_REQUEST_ERROR,
        error: error
    }
)

export const ExpenseGetActionSuccess = (data) => (
    {
        type: ActionTypes.EXPENSE_GET_REQUEST_SUCCESS,
        data: data
    }
)

export const getAllExpenses = () => {
    return async dispatch => {
        dispatch(ExpenseGetActionPending());
        const response = await ExpenseApi.getAllExpenses();
        if(response) {
            dispatch(ExpenseGetActionSuccess(response));
        }
        else {
            const error = 'error while fetching data';
            dispatch(ExpenseGetActionError(error));
        }
    }
}




