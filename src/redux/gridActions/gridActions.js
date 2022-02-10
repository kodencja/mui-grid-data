import {
  throwErrDefined,
  throwErrUndefined,
} from "../../functions/validation/throwErrors";
import { MODAL_ACTION, ROW_PARAMS, SELECTION_ROW } from "./gridTypes";

export const set_row_params = (params) => {
  try {
    throwErrUndefined(params);
    return {
      type: ROW_PARAMS,
      payload: params,
    };
  } catch (err) {
    console.log(
      `Error in set_row_params(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const set_modal_action = (name) => {
  try {
    throwErrUndefined(name);
    throwErrDefined("string", name);
    return {
      type: MODAL_ACTION,
      payload: name,
    };
  } catch (err) {
    console.log(
      `Error in set_modal_action(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const set_selection_row = (row_ids_arr) => {
  try {
    throwErrUndefined(row_ids_arr);
    if (row_ids_arr.length <= 0) {
      throw new Error("There are no selected records");
    }
    return {
      type: SELECTION_ROW,
      payload: row_ids_arr,
    };
  } catch (err) {
    console.log(
      `Error in set_selection_row(): Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

// actions są związane z reducerem poprzez użycie funkcji dispatch(action)
