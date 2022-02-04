import React, { useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
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
import { ActionsContext } from "../App";

// const Buttons = ({ modal_action_name, handleClose, handleDelete }) => {
const Buttons = () => {
  const actsContext = useContext(ActionsContext);

  const { modal_action_name, handleDelete, handleClose } = actsContext;

  return (
    <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
      {modal_action_name !== "view" ? (
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
  );
};

export default Buttons;
