import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import { validateForStrings } from "./validateForStrings";
import { validateForNumbers } from "./validateForNumbers";
import { requiredFieldsNames, stringTypeFields, numberTypeFields, forAscii, forEmail, forAlpha } from "../../constants/arrays_for_form";

export const checkAndValidate = (values) => {
  console.log("values2");
  console.log(values);
  let errors = {};
  const anyErrors = {};

  // REQUIRED FIELDS
  for (let eachProp of requiredFieldsNames) {
    // console.log("eachProp");
    // console.log(eachProp);
    // console.log("Required fields1");
    if (!values[eachProp] && values[eachProp] !== 0) {
      errors[eachProp] = "This field is required";
    }
  }

  // ALL FIELDS CURRENTLY USED
  for (let eachProp in values) {
    const valNoSpacesHTMLent = validator.escape(
      values[eachProp].toString().split(" ").join("")
    );
    if (checkIfPropFit(eachProp, stringTypeFields)) {
      const errorsInStrings = validateForStrings(
        valNoSpacesHTMLent,
        eachProp,
        errors
      );
      if (Object.keys(errorsInStrings).length > 0) {
        anyErrors.errors = errorsInStrings;
      }
    } else if (checkIfPropFit(eachProp, numberTypeFields)) {
      const errorsInNumbers = validateForNumbers(
        valNoSpacesHTMLent,
        eachProp,
        errors
      );
      if (Object.keys(errorsInNumbers).length > 0) {
        anyErrors.errors = errorsInNumbers;
      }
    }

    // CHECK TYPE OF THE VALUES (without errors pointed so far)
    if (!errors[eachProp]) {
      if (checkIfPropFit(eachProp, forAscii)) {
        if (!validator.isAscii(valNoSpacesHTMLent)) {
          errors[eachProp] = "Please use only ASCII chars";
        }
      } else if (checkIfPropFit(eachProp, forAlpha)) {
        console.log("isAlpha");
        if (!validator.isAlpha(valNoSpacesHTMLent)) {
          errors[eachProp] = "Please use only letters";
        }
      } else if (checkIfPropFit(eachProp, forEmail)) {
        if (!validator.isEmail(valNoSpacesHTMLent)) {
          errors[eachProp] = "Provide a valid email address";
        }
      }
    }

    // else {
    //   anyErrors.errors = error;
    // }
  }
  console.log("anyErrors last");
  console.log(anyErrors.errors);

  anyErrors.errors = errors;
  return anyErrors.errors;
};
