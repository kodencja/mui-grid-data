import validator from "validator";
import { throwErrors } from "./throwErrors";

export const checkLength = (value, min, max) => {
  throwErrors('undefined', value, min, max);
  throwErrors('number', min, max);
  
    return validator.isLength(value, {min: min, max: max});
  }