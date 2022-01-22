const checkProp = (values) => {
    return new Promise((resolve, reject) => {
        let errors = {};
        for (let eachProp in values) {
            console.log(eachProp);
            console.log(values[eachProp]);
            if(eachProp === 'name' || eachProp === 'price_netto' ||  eachProp === 'currency' || eachProp === 'use_by_date'){
                if(values[eachProp] === undefined){
                    // resolve(errors[eachProp] = "This field is required");
                    errors[eachProp] = "This field is required";
                }
            }
        }
        console.log(errors);
        resolve(errors);
    })
}

const isDayAhead = (date) => {
  console.log(date);
  console.log(date.valueOf());
  // return new Date(date).valueOf() > new Date().valueOf();
  // const monthForward = new Date().setMonth(new Date().getMonth() + 1);
  // const dayForward = new Date(date).setDate(new Date(date).getDate() + 1);
  const dayForward = new Date().setDate(new Date().getDate());
  // console.log(monthForward);
  console.log(dayForward);
  console.log(new Date(date).valueOf());
  console.log(new Date().setDate(new Date().getDay() + 1));
  // console.log(new Date(date).valueOf() < monthForward.valueOf());
  console.log(isNaN(new Date(date).valueOf()));
  if(isNaN(new Date(date).valueOf())) return true;
  // else return new Date(date).valueOf() < monthForward.valueOf();
  else return new Date(date).valueOf() < dayForward.valueOf();
}


export const validate = async (values) => {
    const errors = {};
    console.log(values);
    console.log(values.use_by_date);
    console.log(values.vat);
    console.log(values.currency);
    // console.log(formData);
    // console.log("VALUES: ");
    // console.log(values);
    // console.log(values.favCol);
    // console.log(Number(values.use_by_date));
    // console.log(values.employed);
    // console.log(values.unemployed);
// const errors = await checkProp(values);

    if (!values.name) {
      errors.name = "This field is required";
    }
    if (!values.price_netto) {
      errors.price_netto = "This field is required";
    }
    // if (values.vat !== 0 && !values.vat) {
    //   errors.vat = "This field is required";
    // }
    // if (!values.use_by_date && !isNaN(values.use_by_date)) {
    // if (!values.use_by_date || Number(values.use_by_date)) {
    // if (!values.use_by_date || new Date().setMonth(new Date().getMonth() + 2)) {
    // if (!values.use_by_date || isDayAhead(values.use_by_date)) {
    if (!values.use_by_date || isDayAhead(values.use_by_date)) {
    // if (true) {
    // if (!values.use_by_date || (new Date(values.use_by_date.toDateString()) < new Date(new Date().setMonth(new Date().getMonth() + 2)).toDateString()) ) {
      // console.log((new Date(values.use_by_date.toDateString()) < new Date(new Date().setMonth(new Date().getMonth() + 2)).toDateString()));
      console.log(isDayAhead(values.use_by_date));
      // errors.use_by_date = "sth";
      // errors.use_by_date = "This field is required";
      errors.use_by_date = "At least a day ahead";
    }
    if (!values.currency) {
      errors.currency = "This field is required";
    }
    if (!values.currency) {
      errors.currency = "This field is required";
    }
    if (!values.unit) {
      errors.unit = "This field is required";
    }
    if (!values.quality) {
      errors.quality = "This field is required";
    }
    // if (values.employment === undefined || !values.employment) {
    //   errors.employment = "Required";
    // }
    console.log(errors);
    return errors;
  };