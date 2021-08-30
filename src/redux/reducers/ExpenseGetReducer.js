import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
    expenseGetServiceIsLoading: false,
    expenseGetServiceError: undefined,
    expenseGetServiceResponse: []
}

const ExpenseGetReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.EXPENSE_GET_REQUEST_PENDING:
            return Object.assign(
                {},
                state,
                {
                    expenseGetServiceIsLoading: true
                }
            );
        case Actions.EXPENSE_GET_REQUEST_ERROR:
            return Object.assign(
                {},
                state,
                {
                    expenseGetServiceIsLoading: false,
                    expenseGetServiceError: action.error
                }
            );
        case Actions.EXPENSE_GET_REQUEST_SUCCESS:
            
            return Object.assign(
                {},
                state,
                {
                    expenseGetServiceIsLoading: false,
                    expenseGetServiceResponse: action.data
                }
            );
        default:
            return state;
    }
}

export default ExpenseGetReducer;