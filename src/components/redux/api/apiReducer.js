import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST } from "./apiTypes";

const initState = { url: '', loading: false, data: [], error: ''};

const dataReducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_DATA_REQUEST: return {...state, url: action.payload, loading: true};
        case FETCH_DATA_SUCCESS: return {...state, data: action.payload, loading: false};
        case FETCH_DATA_FAILURE: return {...state, error: action.payload, loading: false};
        default: return state;
    }
}

export default dataReducer;