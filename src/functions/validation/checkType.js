import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import { forAscii, forEmail, forAlpha } from "../../constants/arrays_for_form";

export const checkType = (valNoSpaces, eachProp, errors) => {
    if (checkIfPropFit(eachProp, forAscii)) {
        if (!validator.isAscii(valNoSpaces)) {
          errors[eachProp] = "Please use only ASCII chars";
        }
      } else if (checkIfPropFit(eachProp, forAlpha)) {
        console.log("isAlpha");
        if (!validator.isAlpha(valNoSpaces)) {
          errors[eachProp] = "Please use only letters";
        }
      } else if (checkIfPropFit(eachProp, forEmail)) {
        if (!validator.isEmail(valNoSpaces)) {
          errors[eachProp] = "Provide a valid email address";
        }
      }

      return errors[eachProp];
}