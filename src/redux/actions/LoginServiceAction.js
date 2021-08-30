import * as ActionTypes from '../ActionTypes';
import * as UserApi from '../../GokaFarmApi/UserApi';

export const loginActionPending = () => (
    {
        type: ActionTypes.LOGIN_REQUEST_PENDING
    }
)

export const loginActionError = (error) => (
    {
        type: ActionTypes.LOGIN_REQUEST_ERROR,
        error: error
    }
)

export const loginActionSuccess = (data) => (
    {
        type: ActionTypes.LOGIN_REQUEST_SUCCESS,
        data: data
    }
)

export const login = (user) => {
    return async dispatch => {
        dispatch(loginActionPending());
        const response = await UserApi.login(user);
        if(response) {
            dispatch(loginActionSuccess(response));
        }
        else {
            const error = 'error while getting data';
            dispatch(loginActionError(error));
        }
    }
}