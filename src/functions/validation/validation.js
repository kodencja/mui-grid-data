import validator from "validator";
import { checkAndValidate } from "./checkAndValidate";



export const validate = (values) => {
    const anyError = {};
    console.log("values1");
    console.log(values);

    if(isNaN(values.discount) || !values.discount) {
      // console.log("isNaN in validate");
      values.discount = 0;
    }
   const errors = checkAndValidate(values);
   anyError.errors = errors;
    console.log(errors);
    console.log(anyError.errors);
    return anyError.errors;
  };