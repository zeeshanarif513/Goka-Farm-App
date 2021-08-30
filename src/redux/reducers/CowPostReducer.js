import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
    loading: false,
    error: undefined,
    data: {}
}

const CowPostReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.COWS_POST_REQUEST_PENDING:
            return Object.assign(
                {},
                state,
                {
                    loading: true
                }
            );
        case Actions.COWS_POST_REQUEST_ERROR:
            return Object.assign(
                {},
                state,
                {
                    loading: false,
                    error: action.error
                }
            );
        case Actions.COWS_POST_REQUEST_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    loading: false,
                    data: action.data
                }
            );
        default:
            return state;
    }
}

export default CowPostReducer;