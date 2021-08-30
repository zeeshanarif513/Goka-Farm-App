import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
    cowsGetServiceIsLoading: false,
    cowsGetServiceError: undefined,
    cowsGetServiceResponse: []
}

const CowsGetReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.COWS_GET_REQUEST_PENDING:
            return Object.assign(
                {},
                state,
                {
                    cowsGetServiceIsLoading: true
                }
            );
        case Actions.COWS_GET_REQUEST_ERROR:
            return Object.assign(
                {},
                state,
                {
                    cowsGetServiceIsLoading: false,
                    cowsGetServiceError: action.error
                }
            );
        case Actions.COWS_GET_REQUEST_SUCCESS:
            
            return Object.assign(
                {},
                state,
                {
                    cowsGetServiceIsLoading: false,
                    cowsGetServiceResponse: action.data
                }
            );
        default:
            return state;
    }
}

export default CowsGetReducer;