import { final_text_resp, api_method, current_url, post_data } from "./types";

// export const set_final_text_resp = (value) => {
export const set_final_text_resp = (dispatch, value) => {
    console.log("value 1: ", value);
    // const obj = { type: final_text_resp, payload: value};
    // return function(dispatch){
        // console.log(value);
        return dispatch({ type: final_text_resp, payload: value}); 
        // return dispatch({ type: final_text_resp, payload: value}); 
    // }

}

// export const set_final_text_resp = (value) => {
//         console.log(value);
//         return {
//             type: final_text_resp,
//             payload: value
//         }
//     }
    

export const set_api_method = (value) => {
    return {
        type: api_method,
        payload: value
    }
}

export const set_current_url = (value) => {
    return {
        type: current_url,
        payload: value
    }
}

export const set_post_data = (value) => {
    return {
        type: post_data,
        payload: value
    }
}

