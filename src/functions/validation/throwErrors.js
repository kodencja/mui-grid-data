
export const throwErrDefined = (typeToCheck, arg) => {
  if (typeof arg !== typeToCheck) {
    throw new Error(`The following parameter is not of ${typeToCheck} type: ${arg}`);
  }
};

export const throwErrUndefined = (arg) => {
  if(typeof arg === 'undefined'){
    throw new Error(`The parameter is undefined`);
  }
};

export const throwErrors = (...args) => {
  const typeToCheck = args[0];

    args.forEach((arg, ind) => {
      if(ind > 0) {
        if(typeToCheck === 'undefined'){
          throwErrUndefined(arg);
        } else {
          throwErrDefined(typeToCheck, arg);
        }
      }
    }) 
};
