import { FETCH_DATA_SUCCESS, REQUEST_COMPLETE, FETCH_REQUEST, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, PUT_DATA_SUCCESS, DEL_ROWS_SUCCESS, POST_DATA_SUCCESS, DEL_DATA_SUCCESS } from "./apiTypes";

export const initApiState = { baseURLtoDB: 'http://localhost:8000/grocery', currentURLtoDB: '', loading: false, data: [], error: ''};

const apiReducer = (state = initApiState, action) => {
    console.log("Loading in apiReducer:");
    console.log(state.loading);
    console.log("action.type:");
    console.log(action.type);
    switch(action.type){
        case FETCH_REQUEST: return {...state, loading: true};
        // case REQUEST_COMPLETE: return {...state, loading: false};
        case FETCH_DATA_REQUEST: return {...state, url: action.payload, loading: true};
        case FETCH_DATA_SUCCESS: return {...state, loading: false, data: action.payload};
        case PUT_DATA_SUCCESS: {
            console.log("PUT method");
            console.log("res.data:");
            console.log(action.payload);
            // console.log(data[action.payload.id - 1]);
            // console.log(action.payload.id - 1);
            const indexOfItem = action.payload.id - 1;
            const updatedData = state.data.map((el) =>
              Number(el.id) - 1 !== indexOfItem ? el : action.payload
            );
            // console.log(updatedData);
            // setData(updatedData);
            return {...state, loading: false, data: updatedData};
        };
        case DEL_ROWS_SUCCESS: {
            let dataCopy = [...state.data];
            action.payload.forEach((id) => {
                dataCopy.splice(dataCopy.findIndex(el => el.id === id), 1);
            });
            console.log("DEL_ROWS_SUCCESS case");
            // console.log(dataCopy);
            // return {...state, data: dataCopy};
            return {...state, loading: false, data: dataCopy};
            // return {...state, loading: false};
        }
        // case POST_DATA_SUCCESS: return {...state, loading: false};
        // case DEL_DATA_SUCCESS: return {...state, loading: false};
        case FETCH_DATA_FAILURE: return {...state, error: action.payload, loading: false};
        default: return state;
    }
}

export default apiReducer;