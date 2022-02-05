import React, { useState, useEffect, useMemo, useContext } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";
import { modalStyle } from "../styles/modalStyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProductDetails from "./ProductDetails";
import { ActionsContext } from "../App";

// if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");
// Modal.setAppElement("#root");

const ModalComp = () => {
  // api: {unstable_eventManager: Ms, state: {…}, instanceId: 5, subscribeEvent: ƒ, publishEvent: ƒ, …}, cellMode: "view", colDef: {width: 100, minWidth: 50, maxWidth: Infinity, hide: false, hideable: true, …}, field: "action", formattedValue: undefined, getValue: ƒ (), hasFocus: false, id: 1502, isEditable: false, row: {discount: 7, vat: 0.08, unit: 'kg', use_by_date: '2022-01-28', name: 'Orange', …}, rowNode: {id: 1502, depth: 0, parent: null, groupingKey: '', groupingField: null}, tabIndex: -1, value: undefined
  const actsContext = useContext(ActionsContext);

  const { modal_action_name, handleClose, modalOpen, row_params } = actsContext;

  console.log("modal_action_name");
  console.log(modal_action_name); // view, del, multi_del
  console.log("row_params");
  console.log(row_params);

  const matches = useMediaQuery("(max-height:500px)");
  const [row_to_del_or_view, set_row_to_del_or_view] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let row = [];
    console.log("ModalComp0");
    if (isMounted) {
      if (modal_action_name !== "multi_del" && row_params && row_params.row) {
        console.log("row_params.row");
        console.log(row_params.row);
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
        console.log("Object.entries out");
        set_row_to_del_or_view(row);
      }
    }
    return () => {
      console.log("ModalComp1");
      isMounted = false;
    };
  }, [row_params, row_params.row]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={{ overflow: "scroll" }}
    >
      {/* <Box sx={style} alignContent="center"> */}
      <Box sx={modalStyle(matches)}>
        <ProductDetails row_to_del_or_view={row_to_del_or_view} />
      </Box>
    </Modal>
  );
};

export default React.memo(ModalComp);
