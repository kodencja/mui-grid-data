import { checkIfPropFit } from "./checkIfPropFit";
import { validateForStrings } from "./validateForStrings";
import { validateForNumbers } from "./validateForNumbers";
import {
  stringTypeFields,
  numberTypeFields,
} from "../../constsNotInStore/data_types_for_validation";
import { throwErrors } from "./throwErrors";

export const chooseValidationForStringsOrNumbers = (valNoSpaces, eachProp) => {

  throwErrors('undefined', valNoSpaces, eachProp);

  // console.log("chooseValidationForStringsOrNumbers");
  // console.log(valNoSpaces);
  if(valNoSpaces === false){
    return 'The value cannot be false';
  }

  if (checkIfPropFit(eachProp, stringTypeFields)) {
    return validateForStrings(valNoSpaces, eachProp);
  }

  if (checkIfPropFit(eachProp, numberTypeFields)) {
    return validateForNumbers(valNoSpaces, eachProp);
  }

  // return `Surely the value is false`; // throw error
};
