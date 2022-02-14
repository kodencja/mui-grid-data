import React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from "@mui/icons-material/Preview";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import validator from "validator";
import { format } from "date-fns";
import {
  getBruttoPrice,
  getDiscountNettoPrice,
} from "../../functions/forColumns.js/valuesGetters";
import {
  handleCancelClick,
  handleEditClick,
  handleSaveClick,
} from "../../functions/forColumns.js/actionsGrid";
import { list_of_countries } from "../../constsNotInStore/countries";
import {
  throwErrDefined,
  throwErrMax,
  throwErrMin,
  throwErrUndefined,
} from "../../functions/validation/throwErrors";
import { stylingCol } from "../../styles/columnStyle";

const useColumns = (propForUseColumns) => {

  const { handleOpen, currencies, units, discounts, vat, qualities, row_edit_error } =
    propForUseColumns;

  const columnsAll = [
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const rowModeInEdit = params.api.getRowMode(params.id) === "edit";

        if (rowModeInEdit) {
          return (
            <>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={(e) => handleSaveClick(e, params)}
                sx={stylingCol.iconSave}
              />
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={(e) => handleCancelClick(e, params)}
                sx={stylingCol.iconCancel}
              />
              {row_edit_error ? (
                <GridActionsCellItem
                  icon={<ErrorIcon />}
                  label="Error"
                  sx={stylingCol.iconError}
                />
              ) : (
                <GridActionsCellItem
                  icon={<CheckCircleIcon />}
                  label="OK"
                  sx={stylingCol.iconOK}
                />
              )}
            </>
          );
        } else {
          return (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                sx={stylingCol.iconEdit}
                onClick={(e) => handleEditClick(e, params)}
              />
              <GridActionsCellItem
                icon={<PreviewIcon />}
                label="View"
                onClick={(e) => handleOpen(params, "view")}
                sx={stylingCol.iconView}
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleOpen(params, "del")}
                color="inherit"
                sx={stylingCol.iconDel}
              />
            </>
          );
        }
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerClassName: "data-grid-header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "price_netto",
      headerName: "Netto",
      type: "number",
      width: 90,
      editable: true,
      headerClassName: "data-grid-header",
      valueFormatter: (params) => {
        try {
          // console.log(params);
          throwErrUndefined(params.value);
          throwErrDefined("number", params.value);
          throwErrMax(params.value, 999999999);
          throwErrMin(params.value, 0.1);
          return params.value && params.value;
        } catch (err) {
          if (err && err.message) {
            console.log(
              `Error name: ${err.name}. Error message for item of ID no: ${params.id} for field ${params.field}: ${err.message}`
            );
          } else {
            console.log("Some error-2:" + err);
          }
        }
      },
    },
    {
      field: "discount",
      headerName: "Discount",
      align: "right",
      width: 90,
      editable: true,
      headerClassName: "data-grid-header",
      type: "singleSelect",
      valueOptions: discounts,
      valueFormatter: (params) => {
        try {
          throwErrUndefined(params.value);
          throwErrDefined("number", params.value);
          throwErrMax(params.value, 100);
          throwErrMin(params.value, 0);
          return params.value && `${params.value} %`;
        } catch (err) {
          if (err && err.message) {
            console.log(
              `Error name: ${err.name}. Error message for item of ID no: ${params.id} for field ${params.field}: ${err.message}`
            );
          } else {
            console.log("Some error-2:" + err);
          }
        }
      },
    },
    {
      field: "discount_netto",
      headerName: "Discount netto",
      type: "number",
      width: 110,
      headerClassName: "data-grid-header",
      valueGetter: getDiscountNettoPrice,
    },
    {
      field: "vat",
      headerName: "VAT",
      headerAlign: "center",
      align: "right",
      width: 80,
      editable: true,
      headerClassName: "data-grid-header",
      type: "singleSelect",
      valueOptions: vat,
      valueFormatter: (params) => {
        try {
          throwErrUndefined(params.value);
          throwErrDefined("number", params.value);
          throwErrMax(params.value, 0.23);
          throwErrMin(params.value, 0);
          return params.value && `${params.value * 100} %`;
        } catch (err) {
          if (err && err.message) {
            console.log(
              `Error name: ${err.name}. Error message for item of ID no: ${params.id} for field ${params.field}: ${err.message}`
            );
          } else {
            console.log("Some error-3:" + err);
          }
        }
      },
    },
    {
      field: "brutto",
      headerName: "Brutto",
      type: "number",
      width: 90,
      headerClassName: "data-grid-header",
      valueGetter: getBruttoPrice,
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 90,
      editable: true,
      align: "center",
      type: "singleSelect",
      valueOptions: currencies,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 90,
      editable: true,
      type: "singleSelect",
      valueOptions: units,
    },
    {
      field: "quality",
      headerName: "Quality: Top, Medium, Low",
      align: "center",
      width: 80,
      type: "singleSelect",
      valueOptions: qualities.map((el) => el[0]),
      editable: true,
    },
    {
      field: "use_by_date",
      headerName: "Use by date",
      type: "date",
      align: "right",
      width: 110,
      editable: true,
      // valueFormatter for displaying
      valueFormatter: (params) => {
        try {
          throwErrUndefined(params.value);
          if (!validator.isDate(params.value)) {
            throw new Error("It's not a date object");
          }
          return params.value && format(new Date(params.value), "Y/MM/dd");
        } catch (err) {
          if (err && err.message) {
            console.log(
              `Error name: ${err.name}. Error message for item of ID no: ${params.id} for field ${params.field}: ${err.message}`
            );
          } else {
            console.log("Some error-3:" + err);
          }
        }
      },
    },
    {
      field: "origin",
      headerName: "Country of origin",
      width: 130,
      editable: true,
      align: "left",
      type: "singleSelect",
      valueOptions: list_of_countries,
    },
    {
      field: "producer",
      headerName: "Producer",
      width: 170,
      editable: true,
    },
    {
      field: "email_contact",
      headerName: "Email contact",
      width: 180,
      editable: true,
    },
  ];

  return columnsAll;
};

export default useColumns;
