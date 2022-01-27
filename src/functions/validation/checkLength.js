import validator from "validator";

export const checkLength = (value, min, max) => {
    return validator.isLength(value, {min: min, max: max});
  }