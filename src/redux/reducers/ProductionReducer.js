import * as Actions from '../ActionTypes';

const INITIAL_STATE = {
    loading: false,
    error: undefined,
    data: []
}

const ProductionReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case Actions.FILTERED_PRODUCTION_REQUEST_PENDING:
            return Object.assign(
                {},
                state,
                {
                    loading: true
                }
            );
        case Actions.FILTERED_PRODUCTION_REQUEST_ERROR:
            return Object.assign(
                {},
                state,
                {
                    loading: false,
                    error: action.error
                }
            );
        case Actions.FILTERED_PRODUCTION_REQUEST_SUCCESS:
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

export default ProductionReducer;