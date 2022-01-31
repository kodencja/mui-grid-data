export const isDaysAhead = (date, noOfdaysAhead) => {
  const today = new Date();
  const twoDaysAhead = new Date(today.getFullYear(), today.getMonth(), today.getDate() + noOfdaysAhead);

  // console.log("isDaysAhead");
  // console.log(date);
  // console.log(new Date(date).valueOf());
  // console.log(twoDaysAhead.valueOf());
  // console.log(new Date(date).valueOf() < twoDaysAhead.valueOf());
  if (isNaN(new Date(date).valueOf())) return true;
  else return new Date(date).valueOf() < twoDaysAhead.valueOf();
};
