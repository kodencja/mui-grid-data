import validator from "validator";

export const escapeHTMLentities = (values) => {
    return new Promise((resolve, reject) => {
      let dataWithoutHTMLchars = {};
  if(!values || (values && Object.keys(values).length === 0) ){
    reject(new Error("Error to validate input value"));
  } else {
    for (let eachProp in values) {
      if (values[eachProp] || values[eachProp] === 0) {
        if (isNaN(values[eachProp])) {
          dataWithoutHTMLchars[eachProp] = validator.escape(values[eachProp]);
        } else {
          // console.log("escapeHTMLentities ELSE");
          dataWithoutHTMLchars[eachProp] = values[eachProp];
        }
      }
    }
  //   console.log(dataWithoutHTMLchars);
    resolve(dataWithoutHTMLchars);
  }
    });
  };