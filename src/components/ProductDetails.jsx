import React, { useMemo, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ActionsContext } from "../App";
import Buttons from "./Buttons";

function ProductDetails({ row_to_del_or_view }) {
  const actsContext = useContext(ActionsContext);

  const { modal_action_name, selection_row, row_params } = actsContext;

  console.log("selection_row in ProductDetails");
  console.log(selection_row);

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

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{
          color: modal_action_name !== "view" ? "warning.light" : "lightpink",
          // color: modal_action_name ? "warning.light" : "burlywood",
          letterSpacing: 2,
          fontWeight: "bold",
        }}
      >
        {modal_action_name !== "view" ? "WARNING!" : "PRODUCT DETAILS"}
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
        {modal_action_name !== "view"
          ? "Are you sure to delete the item from database?"
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
            {detailsAboutRow}
          </Box>
        ) : (
          ""
        )}
      </Typography>
      {/* <Stack spacing={2} direction="row" alignContent="center" justifyContent="center"> */}
      <Buttons
      // modal_action_name={modal_action_name}
      // handleClose={handleClose}
      // handleDelete={handleDelete}
      />
    </>
  );
}

export default ProductDetails;
