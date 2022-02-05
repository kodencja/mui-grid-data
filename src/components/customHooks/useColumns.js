import React, { useContext } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from "@mui/icons-material/Preview";
import { ConstsContext } from "../../App";
import { format } from "date-fns";
import { getBruttoPrice, getDiscountNettoPrice } from "../../functions/forColumns.js/valuesGetters";
import { handleCancelClick, handleEditClick, handleSaveClick } from "../../functions/forColumns.js/actionsGrid";

// const useColumns = (handleOpen, classes) => {
const useColumns = (handleOpen) => {
  const constsContext = useContext(ConstsContext);

  const { list_of_countries, currencies, units, discounts, vat, qualities } =
    constsContext;

  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => ({
      actions: {
        color: theme.palette.text.secondary,
      },
      textPrimary: {
        color: theme.palette.text.primary,
      },
      headers: {
        whiteSpace: "normal",
        wordWrap: "break-word",
        "& .MuiDataGrid-columnHeaderTitleContainer": {
          whiteSpace: "normal",
          wordWrap: "break-word",
          overflow: "visible",
          lineHeight: "2rem",
          alignItems: "flex-start",
          alignContent: "flex-start",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          overflow: "visible",
          lineHeight: "1.43rem",
          whiteSpace: "normal",
        },
        // "& div": {
        //   whiteSpace: "normal",
        //   wordWrap: "break-word",
        //   flexWrap: "wrap",
        // },
      },
    }),
    { defaultTheme }
  );

  const classes = useStyles();

  const styles = {
    customHeaderCell: {
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "visible",
      flexWrap: "wrap",
      // lineHeight: "2rem",
      alignItems: "flex-start",
      alignContent: "flex-start",
      // "& .MuiDataGrid-columnHeaderTitleContainer": {
      //   whiteSpace: "normal",
      //   wordWrap: "break-word",
      //   overflow: "visible",
      //   lineHeight: "2rem",
      //   alignItems: "flex-start",
      //   alignContent: "flex-start",
      // }
      // flexWrap: "wrap",
      // "& div": {
      //   whiteSpace: "normal",
      //   wordWrap: "break-word",
      //   flexWrap: "wrap",
      // },
    },
  };

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
                color="inherit"
              />
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className={classes.textPrimary}
                onClick={(e) => handleCancelClick(e, params)}
                color="inherit"
              />
            </>
          );
        } else {
          return (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className={classes.textPrimary}
                onClick={(e) => handleEditClick(e, params)}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<PreviewIcon />}
                label="View"
                className={classes.textPrimary}
                onClick={(e) => handleOpen(params, "view")}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleOpen(params, "del")}
                color="inherit"
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
        return `${params.value} %`;
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
        return `${params.value * 100} %`;
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
        return format(new Date(params.value), "Y/MM/dd");
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