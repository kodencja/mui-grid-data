import { format } from "date-fns";

export const checkInt = (val) => {
    if (!val || Number(val === 0)) {
      // console.log("!val Int");
      return Number(val);
    } else if (isNaN(val) || !val) {
      val = 0;
    } else {
      return parseInt(val);
    }
  };

  export const checkFloat = (val) => {
    if (!val || val === "0") {
      // console.log("!val Float");
      return val;
    } else {
      return parseFloat(val);
    }
  };

  export const dateFormating = (val) => {
    if (val) {
      return format(new Date(val), "Y-MM-dd");
    }
  };