import { MODAL_ACTION, ROW_PARAMS, SELECTION_ROW } from "./gridTypes";

const initGridState = { row_params: {}, modal_action_name: "", selection_row: [] };

const gridReducer = (state = initGridState, action) => {

    switch(action.type){
        case ROW_PARAMS: return {...state, row_params: action.payload};
        case MODAL_ACTION: return {...state, modal_action_name: action.payload};
        case SELECTION_ROW: return {...state, selection_row: action.payload};
        default: return state;
    }
}

export default gridReducer;