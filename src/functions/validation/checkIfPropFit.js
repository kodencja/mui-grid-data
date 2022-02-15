import { throwErrUndefined } from "./throwErrors";

export const checkIfPropFit = (prop, arrayToCheck) => {
  throwErrUndefined(prop);

if(arrayToCheck.length <= 0){
  throw new Error(`The array ${arrayToCheck} is empty`)
}
    const propFitOrNot = arrayToCheck.some((el) => el === prop);
    return propFitOrNot;
  };