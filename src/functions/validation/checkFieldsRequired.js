import { requiredFieldsNames } from "../../constsNotInStore/data_types_for_validation";
import { throwErrUndefined } from "./throwErrors";

export const checkPropOfRequiredFields = (prop) => {
    throwErrUndefined(prop);
    return requiredFieldsNames.some((el) => el === prop);
  };
  
  const checkIfRequiredFieldHasValue = (value) => {
    // '0' and 'false' exceptions as some values might be equal '0' e.g. from discount or vat fields
    if (
      value !== 0 &&
      value !== false &&
      !value
    ) {
      return false;
    }
    return true;
  };
  
  export const checkRequiredFields = (valuesObj) => {
  
    const valuesObjLength = Object.keys(valuesObj).length;
    
    return new Promise((resolve, reject) => {
      if(valuesObjLength <= 0){
        reject(new Error("No object of values to check!"))
      } else {
        let anyError = {}, n = 0;
        requiredFieldsNames.forEach( (prop) => {
          n++;
          if (!checkIfRequiredFieldHasValue(valuesObj[prop]) ) {
            anyError[prop] = "This field is required";
          }
          });
  
          if(n >= requiredFieldsNames.length){
            resolve(anyError);
          }
      }
    })
  };