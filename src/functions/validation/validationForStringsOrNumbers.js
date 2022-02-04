import { checkIfPropFit } from "./checkIfPropFit";
import { validateForStrings } from "./validateForStrings";
import { validateForNumbers } from "./validateForNumbers";
import { stringTypeFields, numberTypeFields } from "../../constsNotInStore/data_types_for_validation";

export const chooseValidationForStringsOrNumbers = (valNoSpaces, eachProp, errors) => {
  let anyError;
    if (checkIfPropFit(eachProp, stringTypeFields)) {
        anyError = validateForStrings(
          valNoSpaces,
          eachProp
        );

      } else if (checkIfPropFit(eachProp, numberTypeFields)) {
        anyError = validateForNumbers(
          valNoSpaces,
          eachProp
        );
      }

      return anyError;
}