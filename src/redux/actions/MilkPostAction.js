import * as ActionTypes from '../ActionTypes';
import * as MilkApi from '../../GokaFarmApi/MilkApi';

export const MilkPostActionPending = () => (
    {
        type: ActionTypes.MILK_POST_REQUEST_PENDING
    }
)

export const MilkPostActionError = (error) => (
    {
        type: ActionTypes.MILK_POST_REQUEST_ERROR,
        error: error
    }
)

export const MilkPostActionSuccess = (data) => (
    {
        type: ActionTypes.MILK_POST_REQUEST_SUCCESS,
        data: data
    }
)


export const addMilkQuantity = (milkQuantity) => {
    return async dispatch => {
        dispatch(MilkPostActionPending());
        const response = await MilkApi.addMilkQuantity(milkQuantity);
        if(response) {
            dispatch(MilkPostActionSuccess(response));
        }
        else {
            const error = 'error while posting data';
            dispatch(MilkPostActionError(error));
        }
    }
}