import * as ActionTypes from '../ActionTypes';
import * as MilkApi from '../../GokaFarmApi/MilkApi';

export const filteredProductionActionPending = () => (
    {
        type: ActionTypes.FILTERED_PRODUCTION_REQUEST_PENDING
    }
)

export const filteredProductionActionError = (error) => (
    {
        type: ActionTypes.FILTERED_PRODUCTION_REQUEST_ERROR,
        error: error
    }
)

export const filteredProductionActionSuccess = (data) => (
    {
        type: ActionTypes.FILTERED_PRODUCTION_REQUEST_SUCCESS,
        data: data
    }
)

export const getFilteredProduction = (filters) => {
    return async dispatch => {
        dispatch(filteredProductionActionPending());
        const response = await MilkApi.getFilteredProduction(filters);
        if(response) {
            dispatch(filteredProductionActionSuccess(response));
        }
        else{
            const error = 'error while fetching data';
            dispatch(filteredProductionActionError(error));
        }
    }
}

