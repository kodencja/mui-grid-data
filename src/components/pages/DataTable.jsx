import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import ModalComp from "../../components/ModalComp";
import { Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import useColumns from "../customHooks/useColumns";
import useEditRow from "../customHooks/useEditRow";
// import { handleDeleteRow } from "../../functions/modalFn";
import { useStylesData } from "../../styles/useStylesData";
// import {
//   red,
//   pink,
//   purple,
//   deepPurple,
//   indigo,
//   blue,
//   lightBlue,
//   cyan,
//   teal,
//   green,
//   lightGreen,
//   lime,
//   amber,
//   orange,
//   deepOrange,
//   brown,
//   grey,
//   blueGrey,
//   yellow,
// } from "@mui/material/colors";
import { ActionsContext } from "../../App";

// const defaultTheme = createTheme();

// const DataTable = ({ rows, apiProps, gridActionsProps }) => {
const DataTable = ({ rows }) => {
  // const DataTable = ({ rows, api_db, grid_actions }) => {
  const actsContext = useContext(ActionsContext);

  // console.log("api_db.baseURLtoDB");
  // console.log(api_db.baseURLtoDB);
  // console.log("grid_actions.rows_del");
  // console.log(grid_actions.rows_del);

  const {
    baseURLtoDB,
    api_put,
    api_del,
    rows_del,
    row_params,
    set_row_params,
    set_modal_action,
    handleOpen,
    handleDelete,
    set_selection_row,
    selection_row,
  } = actsContext;

  // const { baseURLtoDB, api_put, api_del, rows_del } = apiProps;
  // const { row_params, set_row_params, to_del_row, set_modal_action } =
  //   gridActionsProps;

  const classes = useStylesData();

  const [pageSize, setPageSize] = useState(10);

  // const [row_params, set_row_params] = useState({});
  // const [del_row, set_modal_action] = useState(true);

  useEffect(() => {
    console.log("selection_row");
    console.log(selection_row);
  }, [selection_row]);

  // useEffect(() => {

  //   // }, [to_del_row]);
  // }, [row_params.id]);

  console.log("DataTable Comp.");
  console.log("row_params:");
  console.log(row_params);

  const { editRowsModel, editRowCommit, handleEditRowsModelChange } =
    useEditRow(api_put, baseURLtoDB);

  const columnsAll = useColumns(handleOpen);

  const columns = useMemo(() => {
    return columnsAll;
  }, []);

  function CustomToolbar() {
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
          // aria-expanded={open ? "true" : undefined}
          // onClick={(e) => handleDelete(e, true)}
          onClick={(e) => handleOpen(e, "multi_del")}
          variant="contained"
          disabled={selection_row.length > 0 ? false : true}
          sx={{ color: "warning.main" }}
          // sx={{ color: selection_row.length > 0 ? "warning" : grey[500] }}
          // sx={{ color: blue[700] }}
          // sx={styles.iconMenu}>
        >
          <DeleteIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  }

  const styles = {
    customHeaderCell: {
      "& div": {
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
    },
  };

  return (
    <div
      style={{
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",
        // padding: "5px",

        // backgroundColor: "oldlace",
        // backgroundColor: "lightyellow",
      }}
      className={classes.headersAndCells}
    >
      {/* <ErrorBoundary> */}
      {/* <Typography>{finalTextResponse}</Typography> */}
      <DataGrid
        // className={classes.cellHeight}
        // className={classes.headersAndCells}
        rows={rows}
        columns={columns}
        pagination
        scrollbarSize={10}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        editRowsModel={editRowsModel}
        editMode="row"
        onEditRowsModelChange={handleEditRowsModelChange}
        onRowEditCommit={editRowCommit}
        autoHeight={true}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel) => {
          set_selection_row(newSelectionModel);
        }}
        selectionModel={selection_row}
        components={{
          Toolbar: CustomToolbar,
          // Toolbar: GridToolbar,
        }}
        getCellClassName={(params) =>
          params.field === "discount_netto"
            ? "netto"
            : params.field === "brutto"
            ? "brutto"
            : params.field === "id"
            ? "id"
            : params.field === "use_by_date"
            ? "useByDate"
            : ""
        }
        style={{
          padding: "10px",
          backgroundColor: "#eef5ee",
          marginTop: "10px",
        }}
        rowHeight={35}
        headerHeight={70}
        // sx={styles.customHeaderCell}
        // sx={{ "& .MuiDataGrid-root": { padding: "15px" } }}
      />
      <ModalComp
      // to_del_row={to_del_row}
      // handleDelete={handleDelete}
      // handleClose={handleClose}
      // modalOpen={modalOpen}
      // params={row_params}
      />
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default DataTable;
// export default connect((state, dispatch) => ({
//   api_db: state.api_db,
//   grid_actions: state.grid_actions,
//   rows_del: (url) => dispatch(deleteRows(url)),
// }))(DataTable);

// import {
//   red,
//   pink,
//   purple,
//   deepPurple,
//   indigo,
//   blue,
//   lightBlue,
//   cyan,
//   teal,
//   green,
//   lightGreen,
//   lime,
//   amber,
//   orange,
//   deepOrange,
//   brown,
//   grey,
//   blueGrey,
//   yellow,
// } from "@mui/material/colors";
