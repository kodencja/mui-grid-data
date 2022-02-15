import { throwErrUndefined, throwErrDefined, throwErrMax, throwErrMin } from "./throwErrors";

export const isDaysAhead = (date, noOfdaysAhead) => {

  throwErrUndefined(date);
  throwErrDefined('number', noOfdaysAhead);
  throwErrMax(noOfdaysAhead, 360);
  throwErrMin(noOfdaysAhead, 0);

  const today = new Date();
  const someDaysAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + noOfdaysAhead);

  if (isNaN(new Date(date).valueOf())) return false;
  return new Date(date).valueOf() >= someDaysAhead.valueOf();
};
