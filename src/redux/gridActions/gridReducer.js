import { IF_TO_DEL_ROW, ROW_PARAMS } from "./gridTypes";

const initGridState = { row_params: {}, del_to_row: false };

const gridReducer = (state = initGridState, action) => {

    switch(action.type){
        case ROW_PARAMS: return {...state, row_params: action.payload};
        case IF_TO_DEL_ROW: return {...state, del_to_row: action.payload};
        default: return state;
    }
}

export default gridReducer;