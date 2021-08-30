import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
    milkGetServiceIsLoading: false,
    milkGetServiceError: undefined,
    milkGetServiceResponse: []
}

const MilkGetReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.MILK_GET_REQUEST_PENDING:
            return Object.assign(
                {},
                state,
                {
                    milkGetServiceIsLoading: true
                }
            );
        case Actions.MILK_GET_REQUEST_ERROR:
            return Object.assign(
                {},
                state,
                {
                    milkGetServiceIsLoading: false,
                    milkGetServiceError: action.error
                }
            );
        case Actions.MILK_GET_REQUEST_SUCCESS:
            
            return Object.assign(
                {},
                state,
                {
                    milkGetServiceIsLoading: false,
                    milkGetServiceResponse: action.data
                }
            );
        default:
            return state;
    }
}

export default MilkGetReducer;