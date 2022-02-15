import { checkType } from "./checkType";
import { throwErrors } from "./throwErrors";
import { chooseValidationForStringsOrNumbers } from "./validationForStringsOrNumbers";

export const validateSingleValue = (value, eachProp, errors = {}) => {
    // console.log("value in validateSingleValue");
    // console.log(value);
  
    throwErrors('undefined', value, eachProp);
  
    // ALL FIELDS CURRENTLY USED / ARE BEING TYPED both from ADD and EDIT FROM
      if (!errors[eachProp]) {
        const err =  chooseValidationForStringsOrNumbers(value, eachProp);
        if(err){
          return err;
        }
        return checkType(value, eachProp);
      }
  };