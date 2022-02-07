export const checkIfPropFit = (prop, arrayToCheck) => {
  // console.log(prop);
  // console.log(arrayToCheck);
    const propFitOrNot = arrayToCheck.some((el) => el === prop);
    return propFitOrNot;
  };