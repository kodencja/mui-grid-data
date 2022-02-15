import { format } from "date-fns";
import validator from "validator";
import { throwErrUndefined } from "../validation/throwErrors";

export const checkInt = (val) => {
  try {
    throwErrUndefined(val);
    if (val === "0" || isNaN(val) || !val) {
      return 0;
    }
    return parseInt(val);
  } catch (err) {
      console.log(`Error name: ${err.name}. Error message: ${err.message}`);
  }
};

export const checkFloat = (val) => {
  try {
    throwErrUndefined(val);
    if (val === "0" || isNaN(val) || !val) {
      return 0;
    }
    return parseFloat(val);
  } catch (err) {
      console.log(`Error name: ${err.name}. Error message: ${err.message}`);
  }
};

export const dateFormating = (val) => {
  try {
    throwErrUndefined(val);
    if (!validator.isDate(val)) {
      throw new Error("It's not a date object");
    }
    return format(new Date(val), "Y-MM-dd");
  } catch (err) {
      console.log(`Error name: ${err.name}. Error message: ${err.message}`);
  }
};
