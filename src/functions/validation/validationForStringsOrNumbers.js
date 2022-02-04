import { checkIfPropFit } from "./checkIfPropFit";
import { validateForStrings } from "./validateForStrings";
import { validateForNumbers } from "./validateForNumbers";
import {
  stringTypeFields,
  numberTypeFields,
} from "../../constsNotInStore/data_types_for_validation";

export const chooseValidationForStringsOrNumbers = (valNoSpaces, eachProp) => {
  if (checkIfPropFit(eachProp, stringTypeFields)) {
    return validateForStrings(valNoSpaces, eachProp);
  }

  if (checkIfPropFit(eachProp, numberTypeFields)) {
    return validateForNumbers(valNoSpaces, eachProp);
  }

  return; // throw error
};
