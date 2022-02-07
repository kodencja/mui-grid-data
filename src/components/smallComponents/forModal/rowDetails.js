import { Typography } from "@mui/material";

// export  const detailsAboutRow = (modal_action_name, row_to_del_or_view, selection_row) => {
export const detailsAboutRow = (propsForRowDetails) => {
  const {
    modal_action_name,
    selection_row,
    row_to_del_or_view,
    multi_del,
  } = propsForRowDetails;

  if (modal_action_name !== multi_del) {
    return single_row_details(row_to_del_or_view);
  }
  return multi_rows_details(selection_row);
};

const single_row_details = (row_to_del_or_view) => {
  return (
    row_to_del_or_view &&
    row_to_del_or_view.map((el) => (
      <Typography key={el[0]}>
        {el[0]}:{" "}
        <Typography variant="p" component="span" sx={{ color: "white" }}>
          {el[0] === "discount" || el[0] === "vat" ? `${el[1]} %` : el[1]}
        </Typography>
      </Typography>
    ))
  );
};

const multi_rows_details = (selection_row) => {
  return (
    selection_row &&
    selection_row.map((el) => (
      <Typography
        variant="body1"
        component="span"
        sx={{ color: "white" }}
        key={el}
      >
        {el},{" "}
      </Typography>
    ))
  );
};