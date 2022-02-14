import { MODAL_ACTION, ROW_PARAMS, SELECTION_ROW, ROW_EDIT_ERROR } from "./gridTypes";

const initGridState = { row_params: {}, modal_action_name: "", selection_row: [], row_edit_error: false };

const gridReducer = (state = initGridState, action) => {

    switch(action.type){
        case ROW_PARAMS: return {...state, row_params: action.payload};
        case MODAL_ACTION: return {...state, modal_action_name: action.payload};
        case SELECTION_ROW: return {...state, selection_row: action.payload};
        case ROW_EDIT_ERROR: return {...state, row_edit_error: action.payload};
        default: return state;
    }
}

export default gridReducer;