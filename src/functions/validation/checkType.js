import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import { forAscii, forEmail, forAlpha } from "../../constants/data_types_for_form_validation";

export const checkType = (valNoSpaces, eachProp) => {
  let error;
    if (checkIfPropFit(eachProp, forAscii)) {
        if (!validator.isAscii(valNoSpaces)) {
          error = "Please use only ASCII chars";
        }
      } else if (checkIfPropFit(eachProp, forAlpha)) {
        console.log("isAlpha");
        if (!validator.isAlpha(valNoSpaces)) {
          error = "Please use only letters";
        }
      } else if (checkIfPropFit(eachProp, forEmail)) {
        if (!validator.isEmail(valNoSpaces)) {
          error = "Provide a valid email address";
        }
      }

      return error;
}