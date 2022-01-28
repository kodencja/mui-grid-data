import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import { checkLength } from "./checkLength";
import { isDaysAhead } from "./isDaysAhead";
import { min2Max50, min3Max35, min3Max3, min1Max1, min1Max10, forDate } from "../../constants/arrays_for_form";

export const validateForStrings = (valNoSpacesHTMLent, eachProp, errors) => {
    let min, max;
    // check length for STRING values (except date)

    // for date value
    if (checkIfPropFit(eachProp, forDate)) {
      const noOfdaysAhead = 2;
      if (!validator.isDate(valNoSpacesHTMLent)) {
        errors[eachProp] = `Incorrect date format`;
      } else {
        if (isDaysAhead(valNoSpacesHTMLent, noOfdaysAhead)) {
          errors[eachProp] = `At least ${noOfdaysAhead} days ahead`;
        }
      }
    } else if (checkIfPropFit(eachProp, min2Max50)) {
      min = 2;
      max = 50;
      if (!checkLength(valNoSpacesHTMLent, min, max)) {
        errors[
          eachProp
        ] = `This field must contain between ${min} and ${max} chars`;
      }
    } 
    else if (checkIfPropFit(eachProp, min3Max35)) {
      min = 3;
      max = 35;
      if (!checkLength(valNoSpacesHTMLent, min, max)) {
        errors[
          eachProp
        ] = `This field must contain between ${min} and ${max} chars`;
      }
    } else if (checkIfPropFit(eachProp, min1Max10)) {
      min = 1;
      max = 10;
      if (!checkLength(valNoSpacesHTMLent, min, max)) {
        errors[
          eachProp
        ] = `This field must contain between ${min} and ${max} chars`;
      }
    } else if (checkIfPropFit(eachProp, min3Max3)) {
      min = 3;
      max = 3;
      if (!checkLength(valNoSpacesHTMLent, min, max)) {
        errors[eachProp] = `This field must contain only ${min} chars`;
      }
    } else if (checkIfPropFit(eachProp, min1Max1)) {
      min = 1;
      max = 1;
      if (!checkLength(valNoSpacesHTMLent, min, max)) {
        errors[eachProp] = `This field must contain only ${min} char`;
      }
    }
    return errors;
  };