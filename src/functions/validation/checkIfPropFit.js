export const checkIfPropFit = (prop, arrayToCheck) => {
  // console.log(prop);
  // console.log(arrayToCheck);
if(arrayToCheck.length <= 0){
  throw new Error(`The array ${arrayToCheck} is empty`)
}
    const propFitOrNot = arrayToCheck.some((el) => el === prop);
    return propFitOrNot;
  };