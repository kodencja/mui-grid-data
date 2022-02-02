import { IF_TO_DEL_ROW, ROW_PARAMS } from "./gridTypes";

export const set_row_params = (params) => {
    return {
        type: ROW_PARAMS,
        payload: params
    }
}

export const set_if_to_del_row = (flag) => {
    return {
        type: IF_TO_DEL_ROW,
        payload: flag
    }
}

// actions są związane z reducerem poprzez użycie funkcji dispatch(action)