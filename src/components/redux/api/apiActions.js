import axios from 'axios';
import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST } from "./apiTypes";


export const apiDataRequest = (url) => {
return {
    type: FETCH_DATA_REQUEST,
    payload: url
}
}

export const apiDataSuccess = (data) => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export const apiDataFailure = (error) => {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
}

export const fetchData = (url) => {
return (dispatch) => {
    dispatch(apiDataRequest(url));

    axios.get(url)
    .then(response => {
        dispatch(apiDataSuccess(response.data));
    })
    .catch(error => {
        dispatch(apiDataFailure(error.message));
    })
}
}