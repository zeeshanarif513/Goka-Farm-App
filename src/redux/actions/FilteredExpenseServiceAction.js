import * as ActionTypes from '../ActionTypes';
import * as ExpenseApi from '../../GokaFarmApi/ExpenseApi';

export const filteredExpenseActionPending = () => (
    {
        type: ActionTypes.FILTERED_EXPENSE_REQUEST_PENDING
    }
)

export const filteredExpenseActionError = (error) => (
    {
        type: ActionTypes.FILTERED_EXPENSE_REQUEST_ERROR,
        error: error
    }
)

export const filteredExpenseActionSuccess = (data) => (
    {
        type: ActionTypes.FILTERED_EXPENSE_REQUEST_SUCCESS,
        data: data
    }
)

export const getFilteredExpenses = (filters) => {
    return async dispatch => {
        dispatch(filteredExpenseActionPending());
        const response = await ExpenseApi.getFilteredExpenses(filters);
        if(response) {
            dispatch(filteredExpenseActionSuccess(response));
        }
        else{
            const error = 'error while fetching data';
            dispatch(filteredExpenseActionError(error));
        }
    }
}

