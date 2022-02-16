import { isDaysAhead } from "../validation/isDaysAhead";

export const getCellClasses = (params) => params.field === "name"
      ? "name"
      : params.field === "discount_netto"
      ? "netto"
      : params.field === "brutto"
      ? "brutto"
      : params.field === "price_netto"
      ? "price_netto"
      : params.field === "currency"
      ? "currency"
      : params.field === "quality"
      ? "quality"
      : params.field === "discount"
      ? params.value >= 75
        ? "discount-top"
        : params.value >= 50
        ? "discount-high"
        : params.value >= 30
        ? "discount-medium"
        : "discount"
      : params.field === "producer"
      ? "producer"
      : params.field === "id"
      ? "id"
      : params.field === "action"
      ? "action"
      : params.field === "use_by_date"
      ? !isDaysAhead(params.value, 0)
      ? "out-of-date"
      : !isDaysAhead(params.value, 10)
      ? "sell-priority-high"
      : !isDaysAhead(params.value, 20)
      ? "sell-priority-medium"
      : "useByDate"
      : "";
  
// not used now
  // export const getRowClasses = (params) => !isDaysAhead(params.row.use_by_date, 0)
  // ? "out-of-date"
  // : !isDaysAhead(params.row.use_by_date, 10)
  // ? "sell-priority-high"
  // : !isDaysAhead(params.row.use_by_date, 20)
  // ? "sell-priority-medium"
  // : "";