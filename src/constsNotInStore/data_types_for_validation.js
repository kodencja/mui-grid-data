// these constants are kept here since they are used in validation functions that are neiter React components nor custom hooks and therefore they cannot be imported to those functions as props or through useContext

// array of required fields in the form
export const requiredFieldsNames = [
    "name",
    "price_netto",
    "use_by_date",
    "currency",
    "unit",
    "quality",
    'vat'
  ];

  // arrays gathered according to values types
  export const stringTypeFields = [
    "name",
    "use_by_date",
    "currency",
    "unit",
    "quality",
    "producer",
    "origin",
    "email_contact",
  ];

  export const numberTypeFields = ["price_netto", "discount", "vat"];
  
  // arrays according to the checking type function by validator
  export const forAscii = ['name', 'producer'];
  export const forEmail = ["email_contact"];
  export const forAlpha = ["quality", "currency", "unit", "origin"];
  export const forDate = ["use_by_date"];
  // const forFloat = ["price_netto", "vat"];
  // const forInt = ["discount"];

  // arrays according to the allowed min and max values of the input field value
  export const min01MaxMld = ["price_netto"];
  export const min0Max023 = ["vat"];
  export const min0Max100 = ["discount"];

  // arrays according to the allowed min and max values of the input field value
  export const min2Max50 = ["name", "producer"];
  export const min6Max50 = ["email_contact"];
  export const min3Max35 = ["origin"];
  export const min3Max3 = ["currency"];
  export const min1Max1 = ["quality"];
  export const min1Max10 = ["unit"];
  export const forCountries = ["origin"];
