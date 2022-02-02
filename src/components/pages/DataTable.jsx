import React, { useState, useEffect, useRef, useMemo } from "react";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import useColumns from "../customHooks/useColumns";
import useEditRow from "../customHooks/useEditRow";
import { handleDeleteRow } from "../../functions/modalFn";
import { modalStyle } from "../../styles/modalStyle";
import { useStylesData } from "../../styles/useStylesData";
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

// const defaultTheme = createTheme();

const DataTable = ({ rows, apiProps }) => {
  const { baseURLtoDB, api_put, api_del, rows_del } = apiProps;

  const classes = useStylesData();

  const [pageSize, setPageSize] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [current_row_params, set_current_row_params] = useState({});
  const [del_row, set_del_row] = useState(true);
  const [selectionRow, setSelectionRow] = useState([]);

  const matches = useMediaQuery("(max-height:500px)");

  useEffect(() => {
    console.log("selectionRow");
    console.log(selectionRow);
  }, [selectionRow]);

  console.log("DataTable Comp.");

  const { editRowsModel, editRowCommit, handleEditRowsModelChange } =
    useEditRow(api_put, baseURLtoDB);

  // przy del_rows nie ma 'params'
  const handleOpen = (params, flag) => {
    console.log("flag");
    console.log(flag);
    if (flag === "del") {
      set_del_row(true);
    } else {
      set_del_row(false);
    }
    set_current_row_params(params);
    setModalOpen(true);
  };
  const columnsAll = useColumns(handleOpen);

  const columns = useMemo(() => {
    return columnsAll;
  }, []);

  const handleClose = () => setModalOpen(false);

  const handleDelete = async (e, multi = false) => {
    e.stopPropagation();
    console.log("current_row_params");
    console.log(current_row_params);
    if (multi) {
      console.log("MULTI");
      // handleDeleteRow(current_row_params, set_current_row_params);
      // await handleDeleteRow(rows, selectionRow);
      await rows_del(selectionRow);
      set_current_row_params({});
    } else {
      console.log("Single row del");
      // await api_del(`${baseURLtoDB}/${current_row_params.id}`);
    }
    handleClose();
  };

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
          onClick={(e) => handleOpen(e, true)}
          variant="contained"
          disabled={selectionRow.length > 0 ? false : true}
          sx={{ color: "warning.main" }}
          // sx={{ color: selectionRow.length > 0 ? "warning" : grey[500] }}
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
          setSelectionRow(newSelectionModel);
        }}
        selectionModel={selectionRow}
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
        del_row={del_row}
        style={modalStyle(matches)}
        handleDelete={handleDelete}
        handleClose={handleClose}
        modalOpen={modalOpen}
        params={current_row_params}
      />
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default DataTable;

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
