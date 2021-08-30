import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
    loading: false,
    error: undefined,
    data: {}
}

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.LOGIN_REQUEST_PENDING:
            return Object.assign(
                {},
                state,
                {
                    data: {},
                    loading: true
                }
            );
        case Actions.LOGIN_REQUEST_ERROR:
            return Object.assign(
                {},
                state,
                {
                    loading: false,
                    error: action.error
                }
            );
        case Actions.LOGIN_REQUEST_SUCCESS:
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

export default LoginReducer;