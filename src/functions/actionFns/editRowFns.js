import { checkPropOfRequiredFields } from "../validation/checkFieldsRequired";

export const getUpdatedRowObj = (rowObj = {}) => {
  const rowUpdated = {};
  for (const [key, val] of Object.entries(rowObj)) {
    rowUpdated[key] = val.value;
  }
  return rowUpdated;

};

export const getFlatRowObj = (rowObj = {}) => {
  const rowObjLength = Object.keys(rowObj).length;
  return new Promise((resolve, reject) => {
    if (!rowObj || (rowObj && rowObjLength === 0)) {
      reject(new Error("No values object to check!"));
    } else {
      const rowObjCopy = {};
      for (let prop in rowObj) {  
        // for required fields pass all fields (except undefined and null what was specified while creating rowObj)
        if (checkPropOfRequiredFields(prop)) {
          rowObjCopy[prop] = rowObj[prop].value;
        } else {
            // pass all fields except empty strings '', so also false and 0 , empty strings are considered as no value
          if (rowObj[prop].value !== "") {
            rowObjCopy[prop] = rowObj[prop].value;
          } 
  
        }
  
      }
      resolve(rowObjCopy);
        }
  });
};


export const markErrorInRowObj = (rowObj = {}, errorsObj = {}, error) => {
  const errorsObjLength = Object.keys(errorsObj).length;
  const rowObjLength = Object.keys(rowObj).length;
  let n = 0;
  return new Promise((resolve, reject) => {
    if (!rowObj || (rowObj && rowObjLength === 0)) {
      reject(new Error("No object values to check!"));
    }   
    else {
      if(errorsObjLength) {
        for (let prop in errorsObj) {
          if (errorsObj[prop] !== undefined) {
            error.current = true;
            rowObj[prop] = { ...rowObj[prop], error: true };
          }
          n++;
          if (n >= errorsObjLength) {
            resolve(rowObj);
          }
        }
      } 
  }
  });
};
