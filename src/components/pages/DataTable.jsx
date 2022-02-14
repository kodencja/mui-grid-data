import React, { useState, useEffect, useMemo, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../smallComponents/forForm/CustomToolbar";
import ModalComp from "../../components/ModalComp";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import validator from "validator";
// import useColumns from "../customHooks/useColumns";
import useEditRow from "../customHooks/useEditRow";
import useSomeStyles from "../../styles/useSomeStyles";
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
import { database } from "../../constsNotInStore/titles";
import {
  checkIfNullOrEmptyStrOrUndefined,
  checkPropType,
  returnErrorIfPropTypeInvalid,
} from "../../functions/validation/checkPropTypes";

// const defaultTheme = createTheme();

// const DataTable = ({ rows, apiProps, gridActionsProps }) => {
const DataTable = ({ rows, columns }) => {
  // const DataTable = ({ rows, api_db, grid_actions }) => {
  const actsContext = useContext(ActionsContext);

  // console.log("api_db.baseURLtoDB");
  // console.log(api_db.baseURLtoDB);
  // console.log("grid_actions.rows_del");
  // console.log(grid_actions.rows_del);

  const {
    baseURLtoDB,
    api_put,
    row_params,
    handleOpen,
    set_selection_row,
    selection_row,
    apiResponseTxt,
    responseTxt,
    setMainTitle,
  } = actsContext;

  // const { baseURLtoDB, api_put, api_del, rows_del } = apiProps;
  // const { row_params, set_row_params, to_del_row, set_modal_action } =
  //   gridActionsProps;

  // console.log("row_params");
  // console.log(row_params);

  const { useStylesData } = useSomeStyles();

  const classes = useStylesData();

  const [pageSize, setPageSize] = useState(10);

  // const [row_params, set_row_params] = useState({});
  // const [del_row, set_modal_action] = useState(true);

  useEffect(() => {
    apiResponseTxt("");
    setMainTitle(database);
  }, []);

  // useEffect(() => {

  //   // }, [to_del_row]);
  // }, [row_params.id]);

  // console.log("DataTable Comp.");
  // console.log(window.location.search);
  // console.log("row_params:");
  // console.log(row_params);

  const { editRowsModel, editRowCommit, handleEditRowsModelChange } =
    useEditRow(api_put, baseURLtoDB);

  // const columnsAll = useColumns(handleOpen);

  useEffect(() => {
    apiResponseTxt("");
  }, [editRowsModel]);
  // }, [handleEditRowsModelChange]);

  // const columns = useMemo(() => {
  //   return columnsAll;
  // }, []);

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
      <Typography
        variant="subtitle2"
        component="div"
        sx={{ my: 2, color: responseTxt ? "success.dark" : "text.primary" }}
      >
        {responseTxt}
        {/* {rowMode.current === "edit" ? "" : responseTxt} */}
      </Typography>
      <DataGrid
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
        componentsProps={{
          toolbar: [handleOpen, selection_row],
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
        // initialState={{
        //   pinnedColumns: { left: ["action"], right: ["email_contact"] },
        // }}
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

// console.log(new Error("Error"));
// console.log(new Error("Error") == false);
// console.log(typeof undefined === "undefined");
// console.log(typeof "" === "undefined");
// console.log(typeof "" === "string");
// console.log(typeof null === "undefined");
// console.log(checkIfNullOrEmptyStr(false));
// console.log(validator.isEmail("false"));

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      // name: PropTypes.string.isRequired,
      // price_netto: PropTypes.number.isRequired,
      // discount: PropTypes.number,
      // vat: PropTypes.number.isRequired,
      // currency: PropTypes.string.isRequired,
      // unit: PropTypes.string.isRequired,
      // quality: PropTypes.string.isRequired,
      // use_by_date: (props, propName) => {
      //   if (!validator.isDate(props[propName])) {
      //     return new Error(
      //       `The ${propName} of record of ID no ${props.id}: ${props[propName]} is not a valid date`
      //     );
      //   }
      // },
      // origin: (props, propName) => {
      //   if (!checkIfNullOrEmptyStrOrUndefined(props[propName])) {
      //     if (!checkPropType(props, propName, "string")) {
      //       console.log(props[propName]);
      //       return returnErrorIfPropTypeInvalid(props, propName);
      //     }
      //   }
      // },
      // producer: (props, propName) => {
      //   if (!checkIfNullOrEmptyStrOrUndefined(props[propName])) {
      //     if (!checkPropType(props, propName, "string")) {
      //       console.log(props[propName]);
      //       return returnErrorIfPropTypeInvalid(props, propName);
      //     }
      //   }
      // },
      // email_contact: (props, propName) => {
      //   // if (checkPropType(props, propName, "undefined")) {
      //   // console.log(props[propName]);

      //   // null and empty string values are allowed since it's not required prop
      //   if (!checkIfNullOrEmptyStrOrUndefined(props[propName])) {
      //     // console.log(props[propName]);
      //     // return true;
      //     if (!validator.isEmail(props[propName].toString())) {
      //       console.log(props[propName]);
      //       return returnErrorIfPropTypeInvalid(props, propName);
      //     }
      //   }

      //   // }
      // },
    })
  ),
};

export default DataTable;

/*

    {
      "discount": 10,
      "vat": 0,
      "use_by_date": null,
      "name": "",
      "price_netto": false,
      "unit": 0,
      "currency": "EUR",
      "quality": "M",
      "id": 1596
    }
*/
