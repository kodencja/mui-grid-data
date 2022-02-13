import { checkPropOfRequiredFields } from "../validation/validation";

export const getUpdatedRowObj = (rowObj = {}) => {
// try {
  // if(Object.keys(rowObj).length){
  //   throw new Error('The rowObj object has no props');
  // };
  const rowUpdated = {};
  for (const [key, val] of Object.entries(rowObj)) {
    rowUpdated[key] = val.value;
  }
  console.log("rowUpdated");
  console.log(rowUpdated);
  return rowUpdated;
// } catch (err) {
//   console.log("Error in getUpdatedRowObj(): Error name: " + err.name + ". Error message: " + err.message);
// }
};

// const copyPropWithRequiredFieldsPropChecking = (prop, rowObj) => {
//   if (checkPropOfRequiredFields(prop)) {
//    return rowObj[prop].value;
//   } else {
//     if (rowObj[prop].value !== null && rowObj[prop].value !== "") {
//      return rowObj[prop].value;
//     } 
//     // else {
//     //   rowObjCopy[prop] = rowObj[prop].value;
//     // }
//   }
// }

export const getFlatRowObj = (rowObj = {}) => {
  const rowObjLength = Object.keys(rowObj).length;
  return new Promise((resolve, reject) => {
    if (!rowObj || (rowObj && rowObjLength === 0)) {
      reject(new Error("No values object to check!"));
    } else {
      const rowObjCopy = {};
      for (let prop in rowObj) {
        // console.log("rowObj[prop] " + prop);
        // console.log(rowObj[prop].value);
  
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

// export const markErrorInRowObj = (rowObj, errorsObj, setError) => {
export const markErrorInRowObj = (rowObj = {}, errorsObj = {}, error) => {
  // console.log("rowObj-2");
  // console.log(rowObj);
  // console.log("errorsObj");
  // console.log(errorsObj);
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
