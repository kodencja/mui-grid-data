import validator from "validator";
import { throwErrUndefined } from "./throwErrors";

const escapeHTMLentities = (value) => {

  // if (isNaN(value) && value !== undefined) {
  if (typeof value === 'string') {
    return validator.escape(value);
  }

  return value;
};

export const escapeHTMLentitiesForNaN = (values) => {

throwErrUndefined(values);

  let dataWithoutHTMLchars = {},
    n = 0;
  const valObjLength = Object.keys(values).length;

  return new Promise((resolve, reject) => {
    if (!values || (values && valObjLength === 0)) {
      reject(new Error("Error to validate input value"));
    } else {
      for (let eachProp in values) {
        n++;
        dataWithoutHTMLchars[eachProp] = escapeHTMLentities(values[eachProp]);

        // preserve promise fn from resolving dataWithoutHTMLchars before the loop finishes
        if (n >= valObjLength) {
          resolve(dataWithoutHTMLchars);
        }
      }
    }
  });
};
