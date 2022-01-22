import  initState  from "./initState";
import { final_text_resp, api_method, current_url, post_data, current_record_id } from "./types";

const reducer = (state = initState, action) => {
    console.log("reducer");
    switch(action.type){
        case final_text_resp: return {
            ...state, finalTextResponse: action.payload
        };
        case api_method: return {
            ...state, apiMethod: action.payload
        };
        case current_url: return {
            ...state, currentURLtoDB: action.payload
        };
        case post_data: return {
            ...state, postData: action.payload
        };
        case current_record_id: return {
            ...state, currentRecordId: action.payload
        };
        default: return state;

    }
};

export default reducer;