import { list_of_countries } from "./countries";
// import { requiredFieldsNames, stringTypeFields, numberTypeFields, forAscii, forEmail, forAlpha, forDate, min01MaxMld, min0Max023, min0Max100, min2Max50, min6Max50, min3Max35, min3Max3, min1Max1, min1Max10 } from "../../constsNotInStore/data_types_for_form_validation";
import { currencies, units, qualities, vat, discounts, noOfdaysAhead } from "./vars_for_columns";

export const constsInitState = {list_of_countries, currencies, units, qualities, vat, discounts };

const constantsReducer = (state = constsInitState, action = {type: null}) => {
    return state;
};

export default constantsReducer;