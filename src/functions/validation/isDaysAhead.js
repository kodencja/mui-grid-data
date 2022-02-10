import { throwErrUndefined, throwErrDefined, throwErrMax, throwErrMin } from "./throwErrors";

export const isDaysAhead = (date, noOfdaysAhead) => {

  throwErrUndefined(date);
  throwErrDefined('number', noOfdaysAhead);
  throwErrMax(noOfdaysAhead, 30);
  throwErrMin(noOfdaysAhead, 1);

  const today = new Date();
  const twoDaysAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + noOfdaysAhead);

  if (isNaN(new Date(date).valueOf())) return true;
  return new Date(date).valueOf() < twoDaysAhead.valueOf();
};

export function isValidDate(value) {
  var dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
}
