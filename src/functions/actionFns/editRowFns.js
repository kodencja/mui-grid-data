export const getUpdatedRowObj = (rowObj) => {
  const rowUpdated = {};
  for (const [key, val] of Object.entries(rowObj)) {
    rowUpdated[key] = val.value;
  }
  return rowUpdated;
};

export const getFlatRowObj = (rowObj) => {
  const rowObjCopy = {};
  return new Promise((res, rej) => {
    for (let prop in rowObj) {
      rowObjCopy[prop] = rowObj[prop].value;
    }
    res(rowObjCopy);
  });
};

export const markErrorInRowObj = (rowObj, errorsObj, setError) => {
  const errorsObjLength = Object.keys(errorsObj).length;
  let n = 0;
  return new Promise((resolve, reject) => {
    for (let prop in errorsObj) {
      if (errorsObj[prop] !== undefined) {
        rowObj[prop] = {...rowObj[prop], error: true };
      setError(true);
      }
      n++;
      if(n >= errorsObjLength){
        resolve(rowObj);
      }
    }
  });
};
