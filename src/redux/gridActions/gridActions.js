import { MODAL_ACTION, ROW_PARAMS, SELECTION_ROW, ROW_EDIT_ERROR } from "./gridTypes";

export const set_row_params = (params) => {
  return {
    type: ROW_PARAMS,
    payload: params,
  };
};

export const set_modal_action = (name) => {
  return {
    type: MODAL_ACTION,
    payload: name,
  };
};

export const set_selection_row = (row_ids_arr) => {
  return {
    type: SELECTION_ROW,
    payload: row_ids_arr,
  };
};

export const set_row_edit_error = (bool) => {
  return {
    type: ROW_EDIT_ERROR,
    payload: bool,
  };
};
