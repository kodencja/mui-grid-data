import React, { useState, useCallback, useRef, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ModalComp from "../components/ModalComp";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import useColumns from "../components/customHooks/useColumns";
import useEditRow from "../components/customHooks/useEditRow";
import { handleDeleteRow } from "../components/functions/modalFn";
import { modalStyle } from "../components/styles/modalStyle";
// import { dataTableStyle } from "../components/styles/dataTableStyle";
import { useStylesData } from "../components/styles/useStylesData";

// const defaultTheme = createTheme();

const DataTable = ({ rows, dataTableProps }) => {
  const { dispatch, finalTextResponse, baseURLtoDB } = dataTableProps;

  const classes = useStylesData();
  // const classes = useStylesData();
  // const classes = dataTableStyle();
  const [pageSize, setPageSize] = useState(10);

  const matches = useMediaQuery("(max-height:500px)");

  const [modalOpen, setModalOpen] = useState(false);
  const [row_params, set_row_params] = useState({});
  const [del_row, set_del_row] = useState(true);

  const { editRowsModel, editRowCommit, handleEditRowsModelChange } =
    useEditRow(dispatch, baseURLtoDB);

  const handleOpen = (params, flag) => {
    console.log("flag");
    console.log(flag);
    if (flag === "del") {
      set_del_row(true);
    } else {
      set_del_row(false);
    }
    set_row_params(params);
    setModalOpen(true);
  };
  const columnsAll = useColumns(handleOpen);

  const columns = useMemo(() => {
    return columnsAll;
  }, []);

  const handleClose = () => setModalOpen(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleDeleteRow(row_params, set_row_params);
    handleClose();
  };

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
        // height: "80vh",
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
      <Typography>{finalTextResponse}</Typography>
      <DataGrid
        // className={classes.cellHeight}
        // className={classes.headersAndCells}
        rows={rows}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        editRowsModel={editRowsModel}
        editMode="row"
        onEditRowsModelChange={handleEditRowsModelChange}
        onRowEditCommit={editRowCommit}
        autoHeight={true}
        components={{
          Toolbar: GridToolbar,
        }}
        getCellClassName={(params) =>
          params.field === "Discount_netto"
            ? "netto"
            : params.field === "Brutto"
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
        handleDelete={handleDeleteClick}
        handleClose={handleClose}
        modalOpen={modalOpen}
        params={row_params}
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
