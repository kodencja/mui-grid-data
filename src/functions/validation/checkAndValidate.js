
import { checkType } from "./checkType";
import { requiredFieldsNames } from "../../constants/arrays_for_form";
import { chooseValidationForStringsOrNumbers } from "./validationForStringsOrNumbers";

export const checkAndValidate = (values) => {
  console.log("values2");
  console.log(values);
  let errors = {};

  // REQUIRED FIELDS
  for (let eachProp of requiredFieldsNames) {
    if (!values[eachProp] && values[eachProp] !== 0) {
      errors[eachProp] = "This field is required";
    }
  }

  // ALL FIELDS CURRENTLY USED / TYPED
  for (let eachProp in values) {
    const valNoSpaces = values[eachProp].toString().split(" ").join("");
    // const valNoSpaces = validator.escape(
    //   values[eachProp].toString().split(" ").join(""));
    if (!errors[eachProp]) {
    errors[eachProp] = chooseValidationForStringsOrNumbers(valNoSpaces, eachProp, errors);
    }
    // CHECK TYPE OF THE VALUES (if no errors pointed to them so far)
    if (!errors[eachProp]) {
      errors[eachProp] = checkType(valNoSpaces, eachProp, errors);
    }
  }
  console.log("errors");
  console.log(errors);

  return errors;
};
