import { checkIfPropFit } from "./checkIfPropFit";
import validator from "validator";
import { min01MaxMld, min0Max023, min0Max100 } from "../../constants/arrays_for_form";

export const validateForNumbers = (valNoSpacesHTMLent, eachProp, errors) => {
    let min, max;
    // check type and min and max for NUMERIC values
    console.log("Numeric fields");
    if (checkIfPropFit(eachProp, min01MaxMld)) {
      min = 0.1;
      max = 999999999;
      if (!validator.isFloat(valNoSpacesHTMLent, { min: min, max: max })) {
        errors[
          eachProp
        ] = `This field must be a number between ${min} and ${max}`;
      }
    } else if (checkIfPropFit(eachProp, min0Max023)) {
      min = 0;
      max = 0.23;
      if (!validator.isFloat(valNoSpacesHTMLent, { min: min, max: max })) {
        errors[
          eachProp
        ] = `This field must be a number between ${min} and ${max}`;
      }
    } else if (checkIfPropFit(eachProp, min0Max100)) {
      min = 0;
      max = 100;
      if (!validator.isInt(valNoSpacesHTMLent, { min: min, max: max })) {
        errors[
          eachProp
        ] = `Provide an int no (${min}-${max})`;
      }
    }

    return errors;
  };