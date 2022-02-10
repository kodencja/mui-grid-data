import { throwErrDefined, throwErrMin, throwErrUndefined } from "../validation/throwErrors";

export const getBruttoPrice = (params) => {

  try {
    throwErrUndefined(params);
    throwErrDefined('number', params.id);
    throwErrMin(params.id, 0);
    const netto_discount = params.getValue(params.id, "discount_netto");
    return parseFloat(
      (
        netto_discount +
        netto_discount * params.getValue(params.id, "vat")
      ).toFixed(2)
    );
  } catch (err) {
      console.log(`Error for field of ID ${params.id}: Error name: ${err.name}. Error message: ${err.message}`);
  }

  };

  export const getDiscountNettoPrice = (params) => {

    try {
      throwErrUndefined(params);
      throwErrDefined('number', params.id);
      throwErrMin(params.id, 0);
      
      const netto = params.getValue(params.id, "price_netto");

      return parseFloat(
        (netto - (netto * params.getValue(params.id, "discount")) / 100).toFixed(
          2
        )
      );
    } catch (err) {
      console.log(`Error for field of ID ${params.id}: Error name: ${err.name}. Error message: ${err.message}`);
    }
  };