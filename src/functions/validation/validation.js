import { getFormatOfValueToBeChecked } from "../formatParse/formatNoSpaces";
import { checkRequiredFields } from "./checkFieldsRequired";
import { validateSingleValue } from "./singleValidation";
import { throwErrUndefined } from "./throwErrors";

// MAIN / FIRST VALIDATION FUNCTION
export const validate = async (valuesObj) => {
  try {

    throwErrUndefined(valuesObj);

    if (Object.keys(valuesObj).length <= 0) {
      throw new Error("No valuesObj to validate");
    }
    let errors = {},
      valNoSpaces = {};

      const anyError = await checkRequiredFields(valuesObj);

      errors = {...errors, ...anyError};
   
    for (let eachProp in valuesObj) {
      // value without spaces if not of date type or false
      valNoSpaces[eachProp] = getFormatOfValueToBeChecked(valuesObj, eachProp);

      // if no error in the 'errors[eachProp]' so far, let's proceed further validation
      if (!errors[eachProp]) {
        errors[eachProp] = validateSingleValue(
          valNoSpaces[eachProp],
          eachProp,
          errors
        );
      }
    }

    return errors;
  } catch (error) {
      console.error("Error name: " + error.name + ". Error message: " + error.message);
  }
};