import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
  yellow,
} from "@mui/material/colors";
import { format } from "date-fns";

const ModalComp = ({
  del_row,
  style,
  handleDelete,
  handleClose,
  modalOpen,
  params,
}) => {
  console.log("params:");
  console.log(params);
  // api: {unstable_eventManager: Ms, state: {…}, instanceId: 5, subscribeEvent: ƒ, publishEvent: ƒ, …}, cellMode: "view", colDef: {width: 100, minWidth: 50, maxWidth: Infinity, hide: false, hideable: true, …}, field: "action", formattedValue: undefined, getValue: ƒ (), hasFocus: false, id: 1502, isEditable: false, row: {discount: 7, vat: 0.08, unit: 'kg', use_by_date: '2022-01-28', name: 'Orange', …}, rowNode: {id: 1502, depth: 0, parent: null, groupingKey: '', groupingField: null}, tabIndex: -1, value: undefined

  console.log("del_row");
  console.log(del_row); // true or false

  const [row_to_del_or_view, set_row_to_del_or_view] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let row = [];
    console.log("ModalComp0");
    // let row = new Map();
    if (isMounted && params && params.row) {
      // zamiana obiektu na tablicę z parami tablic 'key-value'
      for (let [key, value] of Object.entries(params.row)) {
        // row.set(key, value);
        // row.push(
        //   <span>
        //     {key}: {value}
        //   </span>
        // );
        // let divide_key = key[key.findIndex(letter => letter === letter.toUpperCase())]
        // if (key === "discount") {
        if (key === "vat") {
          // value = `${parseFloat((value * 100).toFixed(2))} %`;
          value = parseFloat((value * 100).toFixed(2));
        }
        // else if (key === "vat") {
        //   value = `${value * 100} %`;
        // }
        else if (key === "use_by_date") {
          value = format(new Date(value), "Y/MM/dd");
        }
        row.push([key, value]);
      }
      // console.log(row);
      // row.map((el, ind) => console.log(el));
      set_row_to_del_or_view(row);
    }

    return () => {
      console.log("ModalComp1");
      isMounted = false;
    };
  }, [params, params.row]);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // sx={{ overflow: "scroll" }}
    >
      {/* <Box sx={style} alignContent="center"> */}
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            color: del_row ? "warning.light" : "lightpink",
            // color: del_row ? "warning.light" : "burlywood",
            letterSpacing: 2,
            fontWeight: "bold",
          }}
        >
          {del_row ? "WARNING!" : "PRODUCT DETAILS"}
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
          {del_row ? "Are you sure to delete the item from database?" : ""}
          {params && params.row ? (
            <Box
              sx={{
                textAlign: "left",
                color: "palegoldenrod",
                // color: "lemonchiffon",
                mt: 1,
              }}
            >
              {row_to_del_or_view &&
                row_to_del_or_view.map((el, ind) => (
                  <Typography key={el[0]}>
                    {el[0]}:{" "}
                    <Typography
                      variant="p"
                      component="span"
                      sx={{ color: "white" }}
                    >
                      {el[0] === "discount" || el[0] === "vat"
                        ? `${el[1]} %`
                        : el[1]}
                      {/* ? `${parseFloat((el[1] * 100).toFixed(2))}%` */}
                      {/* {el[1]} */}
                    </Typography>
                  </Typography>
                ))}
            </Box>
          ) : (
            ""
          )}
        </Typography>
        {/* <Stack spacing={2} direction="row" alignContent="center" justifyContent="center"> */}
        <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
          {del_row ? (
            <>
              <Button
                variant="contained"
                onClick={(e) => handleDelete(e)}
                color="warning"
              >
                Yes
              </Button>
              <Button variant="contained" onClick={handleClose} color="info">
                No
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                bgcolor: cyan[700],
                "&:hover": { bgcolor: cyan[800] },
              }}
            >
              Close
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalComp);
