import { currencies, units, qualities, vat, discounts } from "./vars_for_columns";
import { warning, product_details, if_sure_single_del, if_sure_multi_del } from "./dialogWords";
import { multi_del, del, view } from "./modalActionTypes";
import { formInitData } from "./forForm";

export const constsInitState = {currencies, units, qualities, vat, discounts, warning, product_details, if_sure_single_del, if_sure_multi_del, multi_del, del, view, formInitData };

const constantsReducer = (state = constsInitState, action = {type: null}) => {
    return state;
};

export default constantsReducer;