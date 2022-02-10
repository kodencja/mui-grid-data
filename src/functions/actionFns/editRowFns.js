import { checkPropOfRequiredFields } from "../validation/validation";

export const getUpdatedRowObj = (rowObj = {}) => {
  const rowUpdated = {};
  for (const [key, val] of Object.entries(rowObj)) {
    rowUpdated[key] = val.value;
  }
  console.log("rowUpdated");
  console.log(rowUpdated);
  return rowUpdated;
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
  const rowObjCopy = {};
  return new Promise((res, rej) => {
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
    res(rowObjCopy);
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
      reject(new Error("No values to check!"));
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
