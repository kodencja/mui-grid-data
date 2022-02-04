import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import { checkLength } from "./checkLength";
import { isDaysAhead } from "./isDaysAhead";
import { min2Max50, min3Max35, min3Max3, min1Max1, min1Max10, forDate } from "../../constsNotInStore/data_types_for_validation";
import { noOfdaysAhead } from '../../constsNotInStore/data_val_for_validation'

export const validateForStrings = (valNoSpaces, eachProp) => {
    let min, max, error;
    // check length for STRING values (except date)

    // for date value
    if (checkIfPropFit(eachProp, forDate)) {
      console.log(valNoSpaces);
     
      if (!validator.isDate(valNoSpaces, {format: "YYYY/MM/DD" || "DD.MM.YYYY"})) {
        error = `Incorrect date format`;
      } else if (isDaysAhead(valNoSpaces, noOfdaysAhead)) {
          
          error = `At least ${noOfdaysAhead} days ahead`;
        }
    } else if (checkIfPropFit(eachProp, min2Max50)) {
      min = 2;
      max = 50;
      if (!checkLength(valNoSpaces, min, max)) {
        error = `This field must contain between ${min} and ${max} chars`;
      }
    } 
    else if (checkIfPropFit(eachProp, min3Max35)) {
      min = 3;
      max = 35;
      if (!checkLength(valNoSpaces, min, max)) {
        error = `This field must contain between ${min} and ${max} chars`;
      }
    } else if (checkIfPropFit(eachProp, min1Max10)) {
      min = 1;
      max = 10;
      if (!checkLength(valNoSpaces, min, max)) {
        error = `This field must contain between ${min} and ${max} chars`;
      }
    } else if (checkIfPropFit(eachProp, min3Max3)) {
      min = 3;
      max = 3;
      if (!checkLength(valNoSpaces, min, max)) {
        
        error = `This field must contain only ${min} chars`;
      }
    } else if (checkIfPropFit(eachProp, min1Max1)) {
      min = 1;
      max = 1;
      if (!checkLength(valNoSpaces, min, max)) {
        
        error = `This field must contain only ${min} char`;
      }
    }

    return error;
  };