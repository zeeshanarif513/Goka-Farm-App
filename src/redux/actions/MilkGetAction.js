import * as ActionTypes from '../ActionTypes';
import * as MilkApi from '../../GokaFarmApi/MilkApi';

export const MilkGetActionPending = () => (
    {
        type: ActionTypes.MILK_GET_REQUEST_PENDING
    }
)

export const MilkGetActionError = (error) => (
    {
        type: ActionTypes.MILK_GET_REQUEST_ERROR,
        error: error
    }
)

export const MilkGetActionSuccess = (data) => (
    {
        type: ActionTypes.MILK_GET_REQUEST_SUCCESS,
        data: data
    }
)

export const getAllMilkAmounts = () => {
    return async dispatch => {
        dispatch(MilkGetActionPending());
        const response = await MilkApi.getAllMilkAmounts();
        if(response) {
            dispatch(MilkGetActionSuccess(response));
        }
        else {
            const error = 'error while fetching data';
            dispatch(MilkGetActionError(error));
        }
    }
}