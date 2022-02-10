import validator from "validator";
import { checkIfPropFit } from "./checkIfPropFit";
import { checkLength } from "./checkLength";
import { isDaysAhead } from "./isDaysAhead";
import { min2Max50, min3Max35, min3Max3, min1Max1, min1Max10, forDate, forCountries } from "../../constsNotInStore/data_types_for_validation";
import { noOfdaysAhead } from '../../constsNotInStore/data_val_for_validation'
import { list_of_countries } from "../../constsNotInStore/countries";
import { throwErrors } from "./throwErrors";

  export const validateForStrings = (valNoSpaces, eachProp) => {
    let min, max;
    // check length for STRING values (except date)

    throwErrors('undefined', valNoSpaces, eachProp);

    // if (valNoSpaces === undefined) {
    //   throw new Error(`The value - "${valNoSpaces}" - is undefined`);
    // }

    // if (eachProp === undefined) {
    //   throw new Error(`The prop - "${eachProp}" - of the values is undefined`);
    // }

    // for date value
    if (checkIfPropFit(eachProp, forDate)) {
     
      if (!validator.isDate(valNoSpaces, {format: "YYYY/MM/DD" || "DD.MM.YYYY"})) {
        return `Incorrect date format`;
      } 
      
      if (isDaysAhead(valNoSpaces, noOfdaysAhead)) {
          return `At least ${noOfdaysAhead} days ahead`;
        }
    } 
    
    if (checkIfPropFit(eachProp, min2Max50)) {
      min = 2;
      max = 50;
      if (!checkLength(valNoSpaces, min, max)) {
        return `This field must contain between ${min} and ${max} chars`;
      }
    } 
    
    if (checkIfPropFit(eachProp, min3Max35)) {
      min = 3;
      max = 35;
      if (!checkLength(valNoSpaces, min, max)) {
        return `This field must contain between ${min} and ${max} chars`;
      }

    }
    
    if (checkIfPropFit(eachProp, forCountries)) {
      if(!list_of_countries.some(country => country === valNoSpaces)){
        return `Type a valid country name`;
      }
    }
    
    if (checkIfPropFit(eachProp, min1Max10)) {
      min = 1;
      max = 10;
      if (!checkLength(valNoSpaces, min, max)) {
        return `This field must contain between ${min} and ${max} chars`;
      }
    } 
    
    if (checkIfPropFit(eachProp, min3Max3)) {
      min = 3;
      max = 3;
      if (!checkLength(valNoSpaces, min, max)) {
        
        return `This field must contain only ${min} chars`;
      }
    } 
    
    if (checkIfPropFit(eachProp, min1Max1)) {
      min = 1;
      max = 1;
      if (!checkLength(valNoSpaces, min, max)) {
        
        return `This field must contain only ${min} char`;
      }
    }

    // return;
    // return `The value is false`;
  };