import { list_of_countries } from "./countries";
import { currencies, units, qualities, vat, discounts } from "./vars_for_columns";

export const constsInitState = {list_of_countries, currencies, units, qualities, vat, discounts };

const constantsReducer = (state = constsInitState, action = {type: null}) => {
    return state;
};

export default constantsReducer;