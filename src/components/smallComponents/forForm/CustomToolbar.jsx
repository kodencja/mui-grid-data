import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import PropTypes from "prop-types";
import { throwErrInstanceof } from "../../../functions/validation/throwErrors";

function CustomToolbar(props) {
  const handleOpen = props[0];
  const selection_row = props[1];

  try {
    throwErrInstanceof(Function, handleOpen);
    throwErrInstanceof(Array, selection_row);
  } catch (err) {
    console.log(
      "Error in CustomToolbar(): Error name: " +
        err.name +
        ". Error message: " +
        err.message
    );
  }

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Typography
        variant="subtitle2"
        component="p"
        sx={{
          color: selection_row.length <= 0 ? "text.disabled" : "warning.main",
          ml: "12px",
          mr: "4px",
        }}
      >
        Multi delete
      </Typography>
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        onClick={(e) => handleOpen(e, "multi_del")}
        variant="contained"
        disabled={selection_row.length > 0 ? false : true}
        sx={{ color: "warning.dark" }}
      >
        <DeleteIcon />
      </IconButton>
    </GridToolbarContainer>
  );
}

CustomToolbar.propTypes = {
  props: PropTypes.arrayOf(PropTypes.func, PropTypes.arrayOf(PropTypes.number)),
};

export default CustomToolbar;
