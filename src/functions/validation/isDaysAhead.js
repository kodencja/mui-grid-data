export const isDaysAhead = (date, noOfdaysAhead) => {
  const today = new Date();
  const twoDaysAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + noOfdaysAhead);

  if (isNaN(new Date(date).valueOf())) return true;
  else return new Date(date).valueOf() < twoDaysAhead.valueOf();
};
