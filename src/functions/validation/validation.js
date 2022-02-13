import { checkType } from "./checkType";
import {
  forDate,
  requiredFieldsNames,
} from "../../constsNotInStore/data_types_for_validation";
import { chooseValidationForStringsOrNumbers } from "./validationForStringsOrNumbers";
import { checkIfPropFit } from "./checkIfPropFit";
import { throwErrors, throwErrUndefined } from "./throwErrors";


const getValuesWithoutSpaces = (val) => {
  throwErrUndefined(val);
  return val.toString().split(" ").join("");
};

const getFormatOfValueToBeChecked = (values, eachProp) => {
  // console.log("values[eachProp]");
  // console.log(values[eachProp]);
  // console.log(eachProp);

  throwErrUndefined(eachProp);

  if (values[eachProp] !== false && !checkIfPropFit(eachProp, forDate)) {
    return getValuesWithoutSpaces(values[eachProp]);
  }
  return values[eachProp];
};

export const checkPropOfRequiredFields = (prop) => {

  throwErrUndefined(prop);
        // REQUIRED FIELDS
        if (requiredFieldsNames.length === 0) {
          throw new Error("No defined required fields");
        }
  return requiredFieldsNames.some((el) => el === prop);
};

const checkValueOfRequiredFields = (value) => {
  // some values might be equal '0' e.g. from discount or vat fields
  console.log("value in checkValueOfRequiredFields");
  console.log(value);
  // console.log(value !== false);
  throwErrUndefined(value);
  if (
    value !== 0 &&
    value !== false &&
    !value
  ) {
    return "This field is required";
  }
};

export const validate = (values) => {
  try {
    console.log("validate values");
    console.log(values);
    // console.log("requiredFieldsNames.length");
    // console.log(requiredFieldsNames.length);

    // throwErrUndefined(values);

    // if (Object.keys(values).length <= 0) {
    //   throw new Error("No values to validate");
    // }
    let errors = {},
      valNoSpaces = {};
    
    for (let eachProp in values) {
      // value without spaces if not of date type
      valNoSpaces[eachProp] = getFormatOfValueToBeChecked(values, eachProp);

      console.log("valNoSpaces[eachProp]");
      console.log(eachProp);
      console.log(valNoSpaces[eachProp]);
      console.log("checkPropOfRequiredFields(eachProp)");
      console.log(checkPropOfRequiredFields(eachProp));

      if (checkPropOfRequiredFields(eachProp)) {
        errors[eachProp] = checkValueOfRequiredFields(
          valNoSpaces[eachProp]
        );
      }

      console.log("errors-1");
      console.log(errors);

      // if no error in the 'errors[eachProp]' so far, let's proceed further validation
      if (!errors[eachProp]) {
        // console.log("errors[eachProp] in validate");
        // console.log(errors[eachProp]);
        errors[eachProp] = validateSingleValue(
          valNoSpaces[eachProp],
          eachProp,
          errors
        );
      }
    }
    console.log("errors-2");
    console.log(errors);

    return errors;
  } catch (error) {
    if(error && error.message){
      console.error("Error name: " + error.name + ". Error message: " + error.message);
    } else {
      console.error("Some error-2:" + error);
    }
  }
};

const validateSingleValue = (value, eachProp, errors = {}) => {
  // console.log("value in validateSingleValue");
  // console.log(value);
  // console.log(eachProp);
  // console.log(errors[eachProp]);

  throwErrors('undefined', value, eachProp);

  // ALL FIELDS CURRENTLY USED / ARE BEING TYPED both from ADD and EDIT FROM
    if (!errors[eachProp]) {
      // console.log("chooseValidationForStringsOrNumbers");
      const err =  chooseValidationForStringsOrNumbers(value, eachProp);
      if(err){
        return err;
      }
      // console.log("In checkType");
      return checkType(value, eachProp);
    }
};