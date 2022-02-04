
import { checkType } from "./checkType";
import { forDate, requiredFieldsNames } from "../../constsNotInStore/data_types_for_validation";
import { chooseValidationForStringsOrNumbers } from "./validationForStringsOrNumbers";
import { checkIfPropFit } from "./checkIfPropFit";

export const validate = (values, fromEditForm = false) => {
  console.log("values2");
  console.log(values);
  let errors = {};

  // REQUIRED FIELDS from Add Form
  if(!fromEditForm){
    for (let eachProp of requiredFieldsNames) {
      if (!values[eachProp] && values[eachProp] !== 0) {
        errors[eachProp] = "This field is required";
      }
    }
  }

  // ALL FIELDS CURRENTLY USED / TYPED both from ADD and EDIT FROM
  let valNoSpaces;
  for (let eachProp in values) {
    if((values && values[eachProp]) || values[eachProp] === 0){
      if(checkIfPropFit(eachProp, forDate)){
        valNoSpaces =  values[eachProp];
      }
      else {
       valNoSpaces = values[eachProp].toString().split(" ").join("");
      } 
    }

      
    // const valNoSpaces = validator.escape(
    //   values[eachProp].toString().split(" ").join(""));
    if (!errors[eachProp]) {
    errors[eachProp] = chooseValidationForStringsOrNumbers(valNoSpaces, eachProp);
    }
    // CHECK TYPE OF THE VALUES (if no errors pointed to them so far)
    if (!errors[eachProp]) {
      errors[eachProp] = checkType(valNoSpaces, eachProp);
    }
  }
  console.log("errors");
  console.log(errors);

  return errors;
};
