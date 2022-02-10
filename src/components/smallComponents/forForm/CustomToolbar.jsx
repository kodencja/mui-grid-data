import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

function CustomToolbar(props) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        onClick={(e) => props[0](e, "multi_del")}
        variant="contained"
        disabled={props[1].length > 0 ? false : true}
        sx={{ color: "warning.main" }}
      >
        <DeleteIcon />
      </IconButton>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
