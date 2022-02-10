import { throwErrUndefined, throwErrDefined } from "./throwErrors";

export const isDaysAhead = (date, noOfdaysAhead) => {

  throwErrUndefined(date);
  throwErrDefined('number', noOfdaysAhead);

  const today = new Date();
  const twoDaysAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + noOfdaysAhead);

  if (isNaN(new Date(date).valueOf())) return true;
  return new Date(date).valueOf() < twoDaysAhead.valueOf();
};
