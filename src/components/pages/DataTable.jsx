import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../smallComponents/forDataGrid/CustomToolbar";
import ModalComp from "../smallComponents/forModal/ModalComp";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import validator from "validator";
import useEditRow from "../customHooks/useEditRow";
import useSomeStyles from "../customHooks/useSomeStyles";
import { ActionsContext } from "../../App";
import { database } from "../../constsNotInStore/titles";
import {
  checkIfNullOrEmptyStrOrUndefined,
  checkPropType,
  returnErrorIfPropTypeInvalid,
} from "../../functions/validation/checkPropTypes";
import { getCellClasses } from "../../functions/forColumns.js/getClasses";

const DataTable = ({ rows, columns }) => {
  const actsContext = useContext(ActionsContext);

  const {
    baseURLtoDB,
    api_put,
    handleOpen,
    set_selection_row,
    selection_row,
    apiResponseTxt,
    responseTxt,
    setMainTitle,
  } = actsContext;

  const { useStylesData } = useSomeStyles();

  const classes = useStylesData();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    apiResponseTxt("");
    setMainTitle(database);
  }, []);

  const { editRowsModel, editRowCommit, handleEditRowsModelChange } =
    useEditRow(api_put, baseURLtoDB);

  useEffect(() => {
    apiResponseTxt("");
  }, [editRowsModel]);

  return (
    <div
      style={{
        height: "calc(80vh - 5vmin)",
        maxHeight: "85vh",
        width: "100%",
      }}
      className={`${classes.rowStyling} ${classes.headersAndCells}`}
    >
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ my: 2, color: responseTxt ? "success.dark" : "text.primary" }}
      >
        {responseTxt}
      </Typography>
      <DataGrid
        style={{
          padding: "10px",
          backgroundColor: "#FAFEFA",
          marginTop: "10px",
        }}
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
        }}
        componentsProps={{
          toolbar: [handleOpen, selection_row],
        }}
        getCellClassName={(params) => getCellClasses(params)}
        // getRowClassName={(params) => getRowClasses(params)}
        rowHeight={35}
        headerHeight={70}
      />
      <ModalComp />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      headerName: PropTypes.string,
      headerClassName: PropTypes.string,
      headerAlign: PropTypes.string,
      type: PropTypes.string,
      sortable: PropTypes.bool,
      editable: PropTypes.bool,
      renderCell: PropTypes.func,
      valueFormatter: PropTypes.func,
      valueGetter: PropTypes.func,
      width: PropTypes.number,
      align: PropTypes.string,
      valueOptions: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      ),
    })
  ),
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price_netto: PropTypes.number.isRequired,
      discount: PropTypes.number,
      vat: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      unit: PropTypes.string.isRequired,
      quality: PropTypes.string.isRequired,

      use_by_date: (props, propName) => {
        if (!validator.isDate(props[propName])) {
          return new Error(
            `The ${propName} of record of ID no ${props.id}: ${props[propName]} is not a valid date`
          );
        }
      },

      origin: (props, propName) => {
        if (!checkIfNullOrEmptyStrOrUndefined(props[propName])) {
          if (!checkPropType(props, propName, "string")) {
            return returnErrorIfPropTypeInvalid(props, propName);
          }
        }
      },

      producer: (props, propName) => {
        if (!checkIfNullOrEmptyStrOrUndefined(props[propName])) {
          if (!checkPropType(props, propName, "string")) {
            return returnErrorIfPropTypeInvalid(props, propName);
          }
        }
      },

      email_contact: (props, propName) => {
        // null and empty string values are allowed since it's not required prop
        if (!checkIfNullOrEmptyStrOrUndefined(props[propName])) {
          if (!validator.isEmail(props[propName].toString())) {
            return returnErrorIfPropTypeInvalid(props, propName);
          }
        }
      },
    })
  ),
};

export default DataTable;
