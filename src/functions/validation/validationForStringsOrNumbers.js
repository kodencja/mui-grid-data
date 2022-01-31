import { checkIfPropFit } from "./checkIfPropFit";
import { validateForStrings } from "./validateForStrings";
import { validateForNumbers } from "./validateForNumbers";
import { stringTypeFields, numberTypeFields } from "../../constants/data_types_for_form_validation";

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