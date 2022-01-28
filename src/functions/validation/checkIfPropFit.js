export const checkIfPropFit = (prop, arrayToCheck) => {
    const propFitOrNot = arrayToCheck.some((el) => el === prop);
    return propFitOrNot;
  };