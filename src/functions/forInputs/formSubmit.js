import { escapeHTMLentitiesForNaN } from "../validation/escapeHTMLent";

export const onSubmit = async (values, api_post, baseURLtoDB) => {
    const dataSubmit = { ...values };
    console.log(values);

    // escape from '0' as string to '0' as a number
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
    window.alert(JSON.stringify(dataSubmit, 0, 2));
  };