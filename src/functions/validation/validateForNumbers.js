import { checkIfPropFit } from "./checkIfPropFit";
import validator from "validator";
import { min01MaxMld, min0Max023, min0Max100 } from "../../constsNotInStore/data_types_for_validation";

export const validateForNumbers = (valNoSpaces, eachProp) => {
    let min, max, error;
    // check type and min and max for NUMERIC values
    console.log("Numeric fields");
    if (checkIfPropFit(eachProp, min01MaxMld)) {
      min = 0.1;
      max = 999999999;
      if (!validator.isFloat(valNoSpaces, { min: min, max: max })) {
       error = `This field must be a number between ${min} and ${max}`;
      }
    } else if (checkIfPropFit(eachProp, min0Max023)) {
      min = 0;
      max = 0.23;
      if (!validator.isFloat(valNoSpaces, { min: min, max: max })) {
       error = `This field must be a number between ${min} and ${max}`;
      }
    } else if (checkIfPropFit(eachProp, min0Max100)) {
      min = 0;
      max = 100;
      if (!validator.isInt(valNoSpaces, { min: min, max: max })) {
       error = `Provide an int no (${min}-${max})`;
      }
    }

    return error;
  };