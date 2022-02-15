
export const throwErrMax = (arg, max) => {
  if(arg > max) throw new Error (`The parameter ${arg} is too high`);
};

export const throwErrMin = (arg, min) => {
  if(arg < min) throw new Error (`The parameter ${arg} is too low`);
};

export const throwErrInstanceof = (instType, arg) => {
  if (!(arg instanceof instType)) throw new TypeError(`The following parameter:  '${arg}' is not instance of ${instType}`);
};

export const throwErrDefined = (typeToCheck, arg) => {
  if (typeof arg !== typeToCheck) throw new TypeError(`The following parameter:  '${arg}' is not of ${typeToCheck} type`);
};

export const throwErrDefinedArr = (...args) => {
  if(args.length <= 1){
    throw new Error(`The param array ${args} needs at least two arguments`);
  }
    const param = args.shift();
    args.forEach((type) => {
          throwErrDefined(type, param);
    })
};

export const throwErrUndefined = (arg) => {
  if(typeof arg === 'undefined'){
    throw new ReferenceError(`The parameter is undefined`);
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
