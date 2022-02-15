import React, { useState, useEffect, useContext } from "react";
import { Modal, Box } from "@mui/material";
import { modalStyle } from "../styles/modalStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductDetails from "./ProductDetails";
import { ActionsContext } from "../App";

const ModalComp = () => {
  const actsContext = useContext(ActionsContext);

  const { modal_action_name, handleClose, modalOpen, row_params } = actsContext;

  const matches = useMediaQuery("(max-height:500px)");
  const [row_to_del_or_view, set_row_to_del_or_view] = useState([]);

  // console.log("ModalComp");

  useEffect(() => {
    let isMounted = true;
    let row = [];
    if (isMounted) {
      if (modal_action_name !== "multi_del" && row_params && row_params.row) {
        let n = 0;
        // zamiana obiektu na tablicę z parami tablic 'key-value'
        for (let [key, value] of Object.entries(row_params.row)) {
          n++;
          if (modal_action_name !== "view" && n > 9) break;
          if (key === "vat") {
            value = parseFloat((value * 100).toFixed(2));
          }
          row.push([key, value]);
        }
        set_row_to_del_or_view(row);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [row_params, row_params.row]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle(matches)}>
        <ProductDetails row_to_del_or_view={row_to_del_or_view} />
      </Box>
    </Modal>
  );
};

export default React.memo(ModalComp);
