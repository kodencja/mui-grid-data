import validator from "validator";
import { throwErrors, throwErrMin, throwErrMax } from "./throwErrors";

export const checkLength = (value, min, max) => {
  // console.log("value");
  // console.log(value);
  throwErrors('undefined', value, min, max);
  throwErrors('number', min, max);
  
    return validator.isLength(value, {min: min, max: max});
  }