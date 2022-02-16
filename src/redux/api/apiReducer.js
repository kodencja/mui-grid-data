import { FETCH_DATA_SUCCESS, FETCH_REQUEST, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, PUT_DATA_SUCCESS, DEL_ROWS_SUCCESS, SET_RESPONSE_TEXT } from "./apiTypes";
import {JSON_API} from '../../constsNotInStore/jsonApi'


export const initApiState = { baseURLtoDB: `${JSON_API}/grocery`, loading: false, data: [], error: '', responseTxt: ''};
// export const initApiState = { baseURLtoDB: 'http://localhost:8000/grocery', loading: false, data: [], error: '', responseTxt: ''};

const apiReducer = (state = initApiState, action) => {
    switch(action.type){
        case FETCH_REQUEST: return {...state, loading: true};
        case SET_RESPONSE_TEXT: return {...state, responseTxt: action.payload};
        case FETCH_DATA_REQUEST: return {...state, url: action.payload, loading: true};
        case FETCH_DATA_SUCCESS: return {...state, loading: false, data: action.payload};
        case PUT_DATA_SUCCESS: {
            const indexOfItem = action.payload.id - 1;
            const updatedData = state.data.map((el) =>
              Number(el.id) - 1 !== indexOfItem ? el : action.payload
            );
            return {...state, loading: false, data: updatedData};
        };
        // MULTI DEL / DELETE MANY ROWS AT ONE TIME - ONLY FROM var DATA, just to prevent user from delete all data in database
        case DEL_ROWS_SUCCESS: {
            let dataCopy = [...state.data];
            action.payload.forEach((id) => {
                dataCopy.splice(dataCopy.findIndex(el => el.id === id), 1);
            });
            return {...state, loading: false, data: dataCopy};
        }

        case FETCH_DATA_FAILURE: return {...state, error: action.payload, loading: false};
        default: return state;
    }
}

export default apiReducer;