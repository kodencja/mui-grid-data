import React, { useMemo, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ActionsContext, ConstsContext } from "../App";
import Buttons from "./Buttons";
import { detailsAboutRow } from "./smallComponents/forModal/rowDetails";

function ProductDetails({ row_to_del_or_view }) {
  const actsContext = useContext(ActionsContext);
  const constsContext = useContext(ConstsContext);

  const { modal_action_name, selection_row, row_params } = actsContext;
  const {
    warning,
    product_details,
    if_sure_single_del,
    if_sure_multi_del,
    multi_del,
    del,
    view,
  } = constsContext;

  const propsForRowDetails = {
    modal_action_name,
    selection_row,
    row_to_del_or_view,
    multi_del,
  };

  console.log("selection_row in ProductDetails");
  console.log(selection_row);

  const rowDetails = useMemo(() => {
    // detailsAboutRow(modal_action_name, row_to_del_or_view, selection_row);
    return detailsAboutRow(propsForRowDetails);
  }, [row_to_del_or_view, selection_row]);

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          color: modal_action_name !== view ? "warning.light" : "lightpink",
          // color: modal_action_name ? "warning.light" : "burlywood",
          letterSpacing: 2,
          fontWeight: "bold",
        }}
      >
        {modal_action_name !== view ? warning : product_details}
      </Typography>
      <Typography
        variant="caption"
        component="div"
        id="modal-modal-description"
        sx={{
          mt: 2,
          fontSize: "18px",
          lineHeight: "120%",
          color: "peachpuff",
        }}
        // sx={{ mt: 2, color: "text.primary" }}
      >
        {modal_action_name === del
          ? if_sure_single_del
          : modal_action_name === multi_del
          ? if_sure_multi_del
          : ""}
        {(row_params && row_params.row) || selection_row.length > 0 ? (
          <Box
            sx={{
              textAlign: "left",
              color: "palegoldenrod",
              // color: "lemonchiffon",
              mt: 1,
            }}
          >
            {rowDetails}
          </Box>
        ) : (
          ""
        )}
      </Typography>

      <Buttons />
    </>
  );
}

export default ProductDetails;

/* 
  const detailsAboutRow = useMemo(() => {
    if (modal_action_name !== "multi_del") {
      return (
        row_to_del_or_view &&
        row_to_del_or_view.map((el, ind) => (
          <Typography key={el[0]}>
            {el[0]}:{" "}
            <Typography variant="p" component="span" sx={{ color: "white" }}>
              {el[0] === "discount" || el[0] === "vat" ? `${el[1]} %` : el[1]}
            </Typography>
          </Typography>
        ))
      );
    }
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
  }, [row_to_del_or_view, selection_row]);

*/
