export const getUpdatedRowObj = (rowObj) => {
  const rowUpdated = {};
  for (const [key, val] of Object.entries(rowObj)) {
    rowUpdated[key] = val.value;
  }
  console.log("rowUpdated"); 
  console.log(rowUpdated); 
  return rowUpdated;
};

export const getFlatRowObj = (rowObj) => {
  const rowObjCopy = {};
  return new Promise((res, rej) => {
    for (let prop in rowObj) {
      if (rowObj[prop].value !== undefined && rowObj[prop].value !== null) {
        rowObjCopy[prop] = rowObj[prop].value;
      } else {
        rowObjCopy[prop] = '';
      }
    }
    res(rowObjCopy);
  });
};

// export const markErrorInRowObj = (rowObj, errorsObj, setError) => {
export const markErrorInRowObj = (rowObj, errorsObj, error) => {
  const errorsObjLength = Object.keys(errorsObj).length;
  let n = 0;
  console.log(rowObj);
  return new Promise((resolve, reject) => {
    for (let prop in errorsObj) {
      if (errorsObj[prop] !== undefined) {
        error.current = true;
        rowObj[prop] = {...rowObj[prop], error: true };
      }
      n++;
      if (n >= errorsObjLength) {
        resolve(rowObj);
      }
    }
  });
};
