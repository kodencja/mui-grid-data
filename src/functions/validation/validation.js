import { checkType } from "./checkType";
import {
  forDate,
  requiredFieldsNames,
} from "../../constsNotInStore/data_types_for_validation";
import { chooseValidationForStringsOrNumbers } from "./validationForStringsOrNumbers";
import { checkIfPropFit } from "./checkIfPropFit";

const getValuesWithoutSpaces = (val) => {
 return val.toString().split(" ").join("");
}

const getValueToBeChecked = (values, eachProp) => {
  if ((values && values[eachProp]) || values[eachProp] === 0) {
    if (!checkIfPropFit(eachProp, forDate)) {
      return getValuesWithoutSpaces(values[eachProp]);
    }
    return values[eachProp];
  }

  return; // throw an error
};

const checkRequiredFields = (values, eachProp) => {
  // some values might be equal '0' e.g. from discount or vat fields
  if (!values[eachProp] && values[eachProp] !== 0) {
    return "This field is required";
  }
};

export const validateFromAddForm = (values) => {
  let errors = {};
  console.log("values in validateFromAddForm");
console.log(values);
  // REQUIRED FIELDS from Add Form
  for (let eachProp of requiredFieldsNames) {
    errors[eachProp] = checkRequiredFields(values, eachProp);
  }
  return validate(values, errors);
};

export const validate = (values, errors = {}) => {
console.log("values in validate");
console.log(values);

  // ALL FIELDS CURRENTLY USED / ARE BEING TYPED both from ADD and EDIT FROM
  for (let eachProp in values) {
    // value without spaces if not of date type
    const valNoSpaces = getValueToBeChecked(values, eachProp);

    if(valNoSpaces !== undefined){
      if (!errors[eachProp]) {
        errors[eachProp] = chooseValidationForStringsOrNumbers(
          valNoSpaces,
          eachProp
        );
      }
      // CHECK TYPE OF THE VALUES (if no errors pointed to them so far)
      if (!errors[eachProp]) {
        errors[eachProp] = checkType(valNoSpaces, eachProp);
      }
    }

  }
  console.log("errors");
  console.log(errors);

  return errors;
};
