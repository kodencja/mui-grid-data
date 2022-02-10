import { format } from "date-fns";
import { isValidDate } from "../validation/isDaysAhead";
import { throwErrUndefined } from "../validation/throwErrors";

export const checkInt = (val) => {
  try {
    throwErrUndefined(val);
    if (val === "0" || isNaN(val) || !val) {
      return 0;
    }
    return parseInt(val);
  } catch (err) {
    if (err && err.message) {
      console.log(`Error name: ${err.name}. Error message: ${err.message}`);
    } else {
      console.log("Some error-3a" + err);
    }
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
    if (err && err.message) {
      console.log(`Error name: ${err.name}. Error message: ${err.message}`);
    } else {
      console.log("Some error-3b:" + err);
    }
  }
};

export const dateFormating = (val) => {
  try {
    throwErrUndefined(val);
    // console.log(isValidDate(val));
    if (!isValidDate(val)) {
      throw new Error("It's not a date object");
    }
    return format(new Date(val), "Y-MM-dd");
  } catch (err) {
    if (err && err.message) {
      console.log(`Error name: ${err.name}. Error message: ${err.message}`);
    } else {
      console.log("Some error-3c:" + err);
    }
  }
};
