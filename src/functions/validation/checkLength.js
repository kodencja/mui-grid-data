import validator from "validator";

export const checkLength = (value, min, max) => {
  // console.log("value");
  // console.log(value);
    return validator.isLength(value, {min: min, max: max});
  }