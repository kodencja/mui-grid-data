import React, { useMemo, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ActionsContext, ConstsContext } from "../../../App";
import Buttons from "./Buttons";
import { detailsAboutRow } from "./rowDetails";
import PropTypes from "prop-types";

function ProductDetails({ row_to_del_or_view }) {
  const actsContext = useContext(ActionsContext);
  const constsContext = useContext(ConstsContext);

  // console.log("row_to_del_or_view");
  // console.log(row_to_del_or_view);

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

  // console.log("selection_row in ProductDetails");
  // console.log(selection_row);

  const rowDetails = useMemo(() => {
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

ProductDetails.propTypes = {
  row_to_del_or_view: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
};

export default ProductDetails;
