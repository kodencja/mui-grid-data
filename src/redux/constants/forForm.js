import { format } from "date-fns";

export const formInitData = {
    discount: 0,
    vat: 0,
    unit: "kg",
    use_by_date: format(new Date(), "Y-MM-dd"),
  };