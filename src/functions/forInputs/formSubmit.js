import { escapeHTMLentitiesForNaN } from "../validation/escapeHTMLent";
import { throwErrDefined, throwErrUndefined } from "../validation/throwErrors";

export const onSubmit = async (values, api_post, baseURLtoDB) => {

try {
  throwErrUndefined(values);
  throwErrDefined('function', api_post);
  throwErrDefined('string', baseURLtoDB);

  if(Object.keys(values).length <= 0){
    throw Error('There are no values to submit');
  }

  const dataSubmit = { ...values };
  console.log(values);

  // escape from '0' as string to '0' as a number, just in case
  if (!dataSubmit.discount || dataSubmit.discount === "0") {
    dataSubmit.discount = 0;
  }
  if (!dataSubmit.price_netto || dataSubmit.price_netto === "0") {
    dataSubmit.price_netto = 0;
  }
  console.log("dataSubmit");
  console.log(dataSubmit);

  const dataNoHTML = await escapeHTMLentitiesForNaN(dataSubmit);
  console.log("dataNoHTML");
  console.log(dataNoHTML);
  await api_post(baseURLtoDB, dataSubmit);
  // window.alert(JSON.stringify(dataSubmit, 0, 2));
} catch (err) {
  if (err && err.message) {
    console.log(`Error name: ${err.name}. Error message: ${err.message}`);
  } else {
    console.log("Some error-4:" + err);
  }
}


  };