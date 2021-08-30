import * as ActionTypes from '../ActionTypes';
import * as CowApi from '../../GokaFarmApi/CowsApi';

export const CowsPostActionPending = () => (
    {
        type: ActionTypes.COWS_POST_REQUEST_PENDING
    }
)

export const CowsPostActionError = (error) => (
    {
        type: ActionTypes.COWS_POST_REQUEST_ERROR,
        error: error
    }
)

export const CowsPostActionSuccess = (data) => (
    {
        type: ActionTypes.COWS_POST_REQUEST_SUCCESS,
        data: data
    }
)

export const postCow = (cow) => {
    return async dispatch => {
        dispatch(CowsPostActionPending());
        const response = await CowApi.postCow(cow);
        if(response) {
            dispatch(CowsPostActionSuccess(response));
        }
        else {
            const error = 'error while posting data';
            dispatch(CowsPostActionError(error));
        }
    }
}