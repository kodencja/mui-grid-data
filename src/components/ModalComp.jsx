import React, { useState, useEffect } from "react";
import { Modal, Box, Button, Stack, Typography } from "@mui/material";

const ModalComp = ({ style, handleDelete, handleClose, modalOpen, params }) => {
  // console.log("params:");
  // console.log(params);

  const [row_to_del, set_row_to_del] = useState([]);

  useEffect(() => {
    let row = [];
    // let row = new Map();
    if (params && params.row) {
      // zamiana obiektu na tablicę z parami tablic 'key-value'
      for (let [key, value] of Object.entries(params.row)) {
        // row.set(key, value);
        // row.push(
        //   <span>
        //     {key}: {value}
        //   </span>
        // );
        // let divide_key = key[key.findIndex(letter => letter === letter.toUpperCase())]
        if (key === "Discount") {
          value = `${parseFloat((value * 100).toFixed(2))} %`;
        } else if (key === "VAT") {
          value = `${value * 100} %`;
        }
        row.push([key, value]);
      }
      // console.log(row);
      row.map((el, ind) => console.log(el));
      set_row_to_del(row);
    }
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
          sx={{ color: "warning.light", letterSpacing: 2, fontWeight: "bold" }}
        >
          WARNING!
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          id="modal-modal-description"
          sx={{ mt: 2 }}
          // sx={{ mt: 2, color: "text.primary" }}
        >
          Are you sure to delete the item from database?
          {params && params.row ? (
            <Box
              sx={{
                textAlign: "left",
                color: "palegoldenrod",
                mt: 1,
                // overflow: "scroll",
              }}
            >
              {row_to_del &&
                row_to_del.map((el, ind) => (
                  <Typography key={el[0]}>
                    {el[0]}:{" "}
                    <Typography
                      variant="p"
                      component="span"
                      sx={{ color: "white" }}
                    >
                      {el[1]}
                    </Typography>
                  </Typography>
                ))}
              {/* {row_to_del &&
                row_to_del.map((el, ind) => (
                  <Typography key={ind}>{el}</Typography>
                ))} */}
              {/* <Typography>ID: {params ? params.id : ""}</Typography>
              <Typography>
                First name: {params ? params.row.firstName : ""}
              </Typography>
              <Typography>
                Last name: {params ? params.row.lastName : ""}
              </Typography> */}
            </Box>
          ) : (
            ""
          )}
        </Typography>
        {/* <Stack spacing={2} direction="row" alignContent="center" justifyContent="center"> */}
        <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handleDelete} color="warning">
            Yes
          </Button>
          <Button variant="contained" onClick={handleClose} color="info">
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalComp);
