import * as ActionTypes from '../ActionTypes';
import * as ExpenseApi from '../../GokaFarmApi/ExpenseApi';

export const ExpensePostActionPending = () => (
    {
        type: ActionTypes.EXPENSE_POST_REQUEST_PENDING
    }
)

export const ExpensePostActionError = (error) => (
    {
        type: ActionTypes.EXPENSE_POST_REQUEST_ERROR,
        error: error
    }
)

export const ExpensePostActionSuccess = (data) => (
    {
        type: ActionTypes.EXPENSE_POST_REQUEST_SUCCESS,
        data: data
    }
)

export const postExpense = (expense) => {
    return async dispatch => {
        dispatch(ExpensePostActionPending());
        const response = await ExpenseApi.postExpense(expense);
        if(response) {
            dispatch(ExpensePostActionSuccess(response));
        }
        else {
            const error = 'error while posting data';
            dispatch(ExpensePostActionError(error));
        }
    }
}



