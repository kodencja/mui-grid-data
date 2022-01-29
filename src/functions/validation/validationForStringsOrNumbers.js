import { checkIfPropFit } from "./checkIfPropFit";
import { validateForStrings } from "./validateForStrings";
import { validateForNumbers } from "./validateForNumbers";
import { stringTypeFields, numberTypeFields } from "../../constants/arrays_for_form";

export const chooseValidationForStringsOrNumbers = (valNoSpaces, eachProp, errors) => {
    if (checkIfPropFit(eachProp, stringTypeFields)) {
        errors[eachProp] = validateForStrings(
          valNoSpaces,
          eachProp,
          errors
        );

      } else if (checkIfPropFit(eachProp, numberTypeFields)) {
        errors[eachProp] = validateForNumbers(
          valNoSpaces,
          eachProp,
          errors
        );
      }
      return errors[eachProp];
}