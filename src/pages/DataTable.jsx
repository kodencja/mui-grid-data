import React, { useState, useCallback, useRef, useMemo } from "react";
import {
  DataGrid,
  GridToolbar,
  GridCellParams,
  GridApi,
  useGridApiRef,
  esES,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridActionsCellItem,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
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
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import ErrorBoundary from "../components/ErrorBoundary";
import ModalComp from "../components/ModalComp";
import { Typography } from "@mui/material";
import {
  final_text_resp,
  api_method,
  current_url,
  post_data,
} from "../components/reducer/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import useColumns from "../components/customHooks/useColumns";

// const defaultTheme = createTheme();
const useStyles = makeStyles({
  cellHeight: {
    ".MuiDataGrid-row, .MuiDataGrid-root .MuiDataGrid-cell, .rendering-zone": {
      "max-height": "none !important",
    },
    ".MuiDataGrid-root .MuiDataGrid-window": {
      position: "relative !important",
    },
    ".MuiDataGrid-root .MuiDataGrid-viewport": {
      "max-height": "none !important",
    },
    ".MuiDataGrid-root": { height: "auto !important" },
  },
  headersAndCells: {
    // autoHeight: "true",
    // fontWeight: 700,
    // height: "400px",
    // headerHeight: "300px",
    "& .MuiDataGrid-columnHeaderTitle": {
      // "& .data-grid-header": {
      fontWeight: 700,
      color: green[900],
      // headerHeight: 300,
      // headerHeight: "300px",
      // autoHeight: "true",
      // height: 400,
      lineHeight: "1rem",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "visible",
      // flexWrap: "wrap",
    },
    "& .MuiDataGrid-cell": {
      // "& .MuiDataGrid-root .MuiDataGrid-cell": {
      fontWeight: 500,
      // display: "flex",
      // lineHeight: "1rem",
      // whiteSpace: "normal !important",
      // wordWrap: "break-word !important",
      // overflow: "visible !important",
    },
    "& .id": {
      backgroundColor: lightBlue[100],
    },
    "& .brutto": {
      backgroundColor: teal[50],
    },
    "& .netto": {
      backgroundColor: lime[100],
    },
    "& .useByDate": {
      backgroundColor: lightGreen[100],
    },
    "& .gray": {
      backgroundColor: grey[100],
    },
  },
});

// const DataTable = ({ columns, rows, apiRef }) => {
const DataTable = ({
  // columns,
  rows,
  dataTableProps,
  // params,
  // modalOpen,
  // handleDelete,
  // handleClose,
}) => {
  const {
    // modalOpen,
    // handleDeleteClick,
    // handleClose,
    // row_params,
    dispatch,
    finalTextResponse,
    baseURLtoDB,
  } = dataTableProps;
  // const refApi = useRef();
  const classes = useStyles();
  // const DataTable = ({ columns, rows }) => {
  const [pageSize, setPageSize] = useState(10);
  const [editRowsModel, setEditRowsModel] = useState({});
  const matches = useMediaQuery("(max-height:500px)");

  const [modalOpen, setModalOpen] = useState(false);
  const [row_params, set_row_params] = useState({});

  // store row data after editing
  const [editRowData, setEditRowData] = useState({});

  const handleOpen = (params) => {
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
    console.log("row_params");
    console.log(row_params);
    const id = row_params.id;
    console.log(id);
    row_params.api.updateRows([{ id, _action: "delete" }]);
    console.log("Row DELETED!");
    handleClose();
    set_row_params({});

    // console.log(apiRef.current);
    // apiRef.current.updateRows([{ id, _action: 'delete' }]);
  };

  const style = {
    color: yellow["50"],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "95%",
    minWidth: matches ? "80%" : "50%",
    maxHeight: "95vh",
    // maxWidth: "90vw",
    // bgcolor: 'background.paper',
    bgcolor: grey[800],
    // backgroundColor: 'background.paper',
    border: "2px solid #000",
    // overlay: { backgroundColor: "rgba(169, 169, 180, 0.733)" },
    boxShadow: 24,
    p: 3,
    textAlign: "center",
    overflow: matches ? "scroll" : "auto",
  };

  // const handleEditRowsModelChange = useCallback(
  const handleEditRowsModelChange = (model) => {
    console.log("handleEditRowsModelChange");
    console.log("model");
    console.log(model); // {3:  age: {value: 45}, firstName: {value: 'Jaime', error: false}, lastName: {value: 'Lannisterro'} }
    // model:  {5: brutto: {value: 109.47}, id: 5, name: {value: 'Broom'}, netto: {value: 95}, origin: {value: 'Sweden'}, useByDate: {value: '2021-10-30'} }
    // row: {id: 5, name: 'Broom', netto: 92, brutto: 109.47, origin: 'Sweden', …}
    // console.log(details); // {}
    // console.log(cos); // {}
    // setEditRowsModel(model);
    const editedIds = Object.keys(model); // 3
    // console.log(editedIds);
    const getUpdatedRowObj = () => {
      const rowUpdated = {};
      for (const [key, value] of Object.entries(model[editedIds[0]])) {
        rowUpdated[key] = value.value;
      }
      // console.log(rowUpdated);
      return rowUpdated;
    };
    // console.log(refApi);
    // console.log("apiRef");
    // console.log(apiRef);
    // user stops editing when the edit model is empty
    if (editedIds.length === 0) {
      // alert(JSON.stringify(editRowData, null, 4));
      // console.log(editRowData);
      console.log("editedIds.length === 0");
      // update on firebase
    } else {
      // setEditRowData({ id: editedIds[0], ...model[editedIds[0]] });
      // setEditRowData({ ...editRowData, ...model[editedIds[0]] });

      // TUTAJ ROBIMY VALIDATION
      if (model[editedIds[0]].Name.value.length < 3) {
        console.log("Too SHORT");
        return;
        // return false;
        // setEditRowData({});
      } else {
        console.log("OKAY");
        // setEditRowData(model[editedIds[0]]);
        setEditRowData({ id: Number(editedIds[0]), ...getUpdatedRowObj() });
        // setEditRowData({ id: Number(editedIds[0]), ...model[editedIds[0]] });
      }

      // setEditRowData({
      //   ...model[editedIds[0]],
      //   firstName: {
      //     value: model[editedIds[0]].firstName.value,
      //     error: true,
      //   },
      // });
    }
    setEditRowsModel(model);
    // console.log("model");
    // console.log(model);
    console.log("editRowData");
    console.log(editRowData);
  };
  //   [editRowData]
  // );

  const editRowCommit = (id) => {
    console.log("EDIT_ROW_COMMIT: ");
    console.log(id); // id number
    // console.log(event);
    // console.log(details);
    // console.log(editRowsModel);
    // console.log(editRowData);
    // TUTAJ ROBIMY ROW UPDATE - trzeba pobrać dany row i zmienić currentURLtoDB na typu update
    dispatch({ type: post_data, payload: editRowData });
    dispatch({ type: api_method, payload: "PUT" });
    dispatch({ type: current_url, payload: `${baseURLtoDB}/${id}` });
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
        // onEditCellPropsChange={cellChange}
        // onRowEditStart={rowStart}
        // onCellEditCommit={changesCommit}
        // isCellEditable={(params) => params.row.id === 5}
        // isCellEditable={isEditing}
        // onRowEditStop={rowStop}
        // onRowClick={handleRowClick}
        // onCellDoubleClick={doubleClick}
        // apiRef={apiRef}
        // ref={refApi}
        // onCellValueChange={onCellValChange}
        // onCellEditStart={editCommit}
        // onCellDoubleClick={(params, event) => {
        //   if (!event.ctrlKey) {
        //     event.defaultMuiPrevented = true;
        //   }
        // }}
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
        style={style}
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
// export default React.memo(DataTable);

// baseUrlDB: "http://localhost:5000/grocery"

// console.log(editRowData);

// const rowStop = (params, event, details) => {
//   // event.defaultMuiPrevented = true;
//   console.log("ROW_STOP");
//   console.log(params.row);
//   // console.log("editRowsModel");
//   // console.log(editRowsModel);
//   // console.log("editRowData");
//   // console.log(editRowData);
//   // console.log(event);
//   // console.log(details);
// };

// const rowStart = (params, event, details) => {
//   // event.defaultMuiPrevented = true;
//   console.log("ROW_START");
//   // console.log(params);
//   console.log(params.row); // {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16}
//   // console.log(event);
//   // console.log(details);
//   // console.log("editRowsModel");
//   // console.log(editRowsModel);
//   // console.log("editRowData");
//   // console.log(editRowData);
// };
