export const getBruttoPrice = (params) => {
    const netto_discount = params.getValue(params.id, "discount_netto");
    return parseFloat(
      (
        netto_discount +
        netto_discount * params.getValue(params.id, "vat")
      ).toFixed(2)
    );
  };

  export const getDiscountNettoPrice = (params) => {
    const netto = params.getValue(params.id, "price_netto");

    return parseFloat(
      (netto - (netto * params.getValue(params.id, "discount")) / 100).toFixed(
        2
      )
    );
  };