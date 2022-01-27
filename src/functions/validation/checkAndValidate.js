import validator from "validator";
import { checkLength } from "./checkLength";
import { isDaysAhead } from "./isDaysAhead";

export const checkAndValidate = (values) => {
    console.log("values2");
    console.log(values);
    const errors = {};
  
  // REQUIRED FIELDS
    if (!values.name) {
      errors.name = "This field is required";
    // } else if(nameNoSpaces.length > 40) {
    } else {
      const nameNoSpaces = validator.escape(values.name.toString().split(" ").join(""));
      const min = 3, max = 50;
      // if(!validator.isLength(nameNoSpaces, {max: 40, min: 3}) ) {
      if(!checkLength(nameNoSpaces, min, max) ) {
        errors.name = `Name must contain between ${min} and ${max} chars`;
      } else if(!validator.isAscii(nameNoSpaces)){
        errors.name = "Please use only ASCII chars";
      }
    } 
    if (!values.price_netto && values.price_netto !== 0) {
      errors.price_netto = "This field is required";
    } else {
      // const priceNettoNoSpaces = validator.escape(values.price_netto.toString().split(" ").join(""));
      if(values.price_netto > 999999999){
        errors.price_netto = 'The price must not exceed 999,999,999';
      } else if(values.price_netto <= 0) {
        errors.price_netto = 'The price must be over 0';
      }
    }
    if (!values.use_by_date) {
      errors.use_by_date = "This field is required";
    } else {
      const use_by_dateNoSpaces = validator.escape(values.use_by_date.toString().split(" ").join(""));
      const noOfdaysAhead = 2;
      // if(isDaysAhead(values.use_by_date)){
      if(isDaysAhead(use_by_dateNoSpaces, noOfdaysAhead)){
        // console.log(isDaysAhead(values.use_by_date));
        errors.use_by_date = `At least ${noOfdaysAhead} days ahead`;
      }
    }
    if (!values.currency) {
      errors.currency = "This field is required";
    } else {
      const currencyNoSpaces = validator.escape(values.currency.toString().split(" ").join(""));
      const min = 3, max = 3;
      if(!checkLength(currencyNoSpaces, min, max) ) {
        errors.currency = 'Currency name\'s length must be equal '+ min;
      } else if(!validator.isAlpha(currencyNoSpaces)){
        errors.currency = "Please use only letters";
      }
    }
  
    if (!values.unit) {
      errors.unit = "This field is required";
    } else {
      const unitNoSpaces = validator.escape(values.unit.toString().split(" ").join(""));
      if(!validator.isAlpha(unitNoSpaces)){
        errors.unit = "Please use only letters";
      }
    }
    if (!values.quality) {
      errors.quality = "This field is required";
    } else {
      const qualityNoSpaces = validator.escape(values.quality.toString().split(" ").join(""));
      const min = 1, max = 1;
      if(!checkLength(qualityNoSpaces, min, max) ){
        errors.quality = `Quality char's length must contain only ${min} letter ('T', 'M' or 'L')`;
      } else if(!validator.isAlpha(qualityNoSpaces)){
        errors.quality = "Please use only letters";
      }
    }
  
  // NOT REQUIRED FIELDS
  if(values.discount){
    // const discountNoSpaces = validator.escape(values.discount.toString().split(" ").join(""));
    if(values.discount > 100){
      errors.discount = 'Discount must not exceed 100%';
    } else if(values.discount < 0) {
      errors.discount = 'Discount cannot be below 0';
    }
  }
  if(values.origin){
    const originNoSpaces = validator.escape(values.origin.toString().split(" ").join(""));
    const min = 3, max = 35;
    if(!checkLength(originNoSpaces, min, max)){
      errors.origin = `Country name must contain between ${min} and ${max} chars`;
    } else if(!validator.isAlpha(originNoSpaces)) {
      errors.origin = 'Use only letters';
    }
  }
  if(values.email_contact){
    const email_contactNoSpaces = validator.escape(values.email_contact.toString().split(" ").join(""));
    const min = 0, max = 50;
    if(!checkLength(email_contactNoSpaces, min, max)){
      errors.email_contact = `Email address must contain not more than ${max} chars`;
    } else if(!validator.isEmail(email_contactNoSpaces)) {
      errors.email_contact = 'Provide a valid email address';
    }
  }
  if(values.producer){
    const producerNoSpaces = validator.escape(values.producer.toString().split(" ").join(""));
    const min = 2, max = 50;
    if(!checkLength(producerNoSpaces, min, max)){
      errors.producer = `Producer name must contain between ${min} and ${max} chars`;
    } else if(!validator.isAscii(producerNoSpaces)) {
      errors.producer = 'Provide a valid producer name';
    }
  }
  if(values.vat){
    const min = 0, max = 0.23;
    // const vatNoSpaces = validator.escape(values.vat.toString().split(" ").join(""));
    if(values.vat > max){
      errors.vat = `Vat must not exceed ${max}%`;
    } else if(values.vat < min) {
      errors.vat = `Vat cannot be below ${min}%`;
    }
  }
  
    console.log(errors);
    return errors;
  }