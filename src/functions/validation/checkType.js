import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import {
  forAscii,
  forEmail,
  forAlpha,
} from "../../constsNotInStore/data_types_for_validation";
import { throwErrors } from "./throwErrors";

export const checkType = (valNoSpaces, eachProp) => {
  throwErrors("undefined", valNoSpaces, eachProp);

  console.log("eachProp checkType");
  console.log(eachProp);

  if (checkIfPropFit(eachProp, forAscii)) {
    if (!validator.isAscii(valNoSpaces)) {
      return "Please use only ASCII chars";
    }
  }
  if (checkIfPropFit(eachProp, forAlpha)) {
    if (!validator.isAlpha(valNoSpaces)) {
      return "Please use only letters";
    }
  }
  if (checkIfPropFit(eachProp, forEmail)) {
    if (!validator.isEmail(valNoSpaces)) {
      return "Provide a valid email address";
    }
  }
  return;
};
