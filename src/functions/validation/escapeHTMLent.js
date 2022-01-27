import validator from "validator";

export const escapeHTMLentities = (values) => {
    return new Promise((resolve, reject) => {
      let dataWithoutHTMLchars = {};
  
      for (let eachProp in values) {
        // console.log(eachProp);
        // console.log(values[eachProp]);
        if (values[eachProp] || values[eachProp] === 0) {
          if (isNaN(values[eachProp])) {
            dataWithoutHTMLchars[eachProp] = validator.escape(values[eachProp]);
          } else {
            console.log("escapeHTMLentities ELSE");
            dataWithoutHTMLchars[eachProp] = values[eachProp];
          }
        }
      }
    //   console.log(dataWithoutHTMLchars);
      resolve(dataWithoutHTMLchars);
    });
  };