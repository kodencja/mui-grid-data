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
        // if (requiredFieldsNames.length === 0) {
        //   throw new Error("No defined required fields");
        // }
  return requiredFieldsNames.some((el) => el === prop);
};

const checkIfRequiredFieldHasValue = (value) => {
  // some values might be equal '0' e.g. from discount or vat fields
  // console.log("value in checkIfRequiredFieldHasValue");

  if (
    value !== 0 &&
    value !== false &&
    !value
  ) {
    return false;
  }
  return true;
};

const checkRequiredFields = (valuesObj) => {

  const valuesObjLength = Object.keys(valuesObj).length;

  // console.log("valuesObjLength");
  // console.log(valuesObjLength);
  
  return new Promise((resolve, reject) => {
    if(valuesObjLength <= 0){
      reject(new Error("No object of values to check!"))
    } else {
      let anyError = {}, n = 0;
      requiredFieldsNames.forEach( (prop) => {
        n++;
        if (!checkIfRequiredFieldHasValue(valuesObj[prop]) ) {
          anyError[prop] = "This field is required";
        }
        });
      // console.log("n");
      // console.log(n);
        if(n >= requiredFieldsNames.length){
          // console.log("anyError");
          // console.log(anyError);
          resolve(anyError);
        }
    }

  })



};

export const validate = async (valuesObj) => {
  try {
    console.log("validate valuesObj");
    console.log(valuesObj);
    // console.log("requiredFieldsNames.length");
    // console.log(requiredFieldsNames.length);

    throwErrUndefined(valuesObj);

    if (Object.keys(valuesObj).length <= 0) {
      throw new Error("No valuesObj to validate");
    }
    let errors = {},
      valNoSpaces = {};

      const anyError = await checkRequiredFields(valuesObj);

      errors = {...errors, ...anyError};

      // console.log("errors-1");
      // console.log(errors);

   
    for (let eachProp in valuesObj) {
      // value without spaces if not of date type
      valNoSpaces[eachProp] = getFormatOfValueToBeChecked(valuesObj, eachProp);

      // console.log("valNoSpaces[eachProp]");
      // console.log(eachProp);
      // console.log(valNoSpaces[eachProp]);
 
      // console.log("errors-2");
      // console.log(errors);

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
    // console.log("errors-3");
    // console.log(errors);

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