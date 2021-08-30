import * as ActionTypes from '../ActionTypes';
import * as CowApi from '../../GokaFarmApi/CowsApi';

export const CowsGetActionPending = () => (
    {
        type: ActionTypes.COWS_GET_REQUEST_PENDING
    }
)

export const CowsGetActionError = (error) => (
    {
        type: ActionTypes.COWS_GET_REQUEST_ERROR,
        error: error
    }
)

export const CowsGetActionSuccess = (data) => (
    {
        type: ActionTypes.COWS_GET_REQUEST_SUCCESS,
        data: data
    }
)

export const getAllCows = () => {
    return async dispatch => {
        dispatch(CowsGetActionPending());
        const response = await CowApi.getAllCows();
        if(response) {
            dispatch(CowsGetActionSuccess(response));
        }
        else {
            const error = 'error while fetching data';
            dispatch(CowsGetActionError(error));
        }
    }
}