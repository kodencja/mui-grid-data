import { forDate } from "../../constsNotInStore/data_types_for_validation";
import { checkIfPropFit } from "../validation/checkIfPropFit";
import { throwErrUndefined } from "../validation/throwErrors";


const getValuesWithoutSpaces = (val) => {
    throwErrUndefined(val);
    return val.toString().split(" ").join("");
  };
  
  export const getFormatOfValueToBeChecked = (values, eachProp) => {
  
    throwErrUndefined(eachProp);
  
    if (values[eachProp] !== false && !checkIfPropFit(eachProp, forDate)) {
      return getValuesWithoutSpaces(values[eachProp]);
    }
    return values[eachProp];
  };