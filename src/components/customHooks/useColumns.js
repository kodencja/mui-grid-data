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
// import { list_of_countries } from "../../redux/constants/countries";
// import {
//   currencies,
//   units,
//   discounts,
//   vat,
//   qualities,
// } from "../../redux/constants/vars_for_columns";
import { format } from "date-fns";

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

  const handleEditClick = (event, params) => {
    event.stopPropagation(); // don't select this row after clicking

    const api = params.api;
    // console.log("id: ", params.id);
    // console.log("api");
    // console.log(api);
    // console.log("apiRef

    api.setRowMode(params.id, "edit");
  };

  const handleSaveClick = (event, params) => {
    event.stopPropagation();
    console.log(params);
    params.api.commitRowChange(params.id);
    params.api.setRowMode(params.id, "view");
    const row = params.api.getRow(params.id);
    params.api.updateRows([{ ...row }]);
  };

  const handleCancelClick = (event, params) => {
    event.stopPropagation();
    const api = params.api;
    // console.log(api.getRowMode(params.id));
    api.setRowMode(params.id, "view");
  };

  const getBruttoPrice = (params) => {
    const netto_discount = params.getValue(params.id, "discount_netto");
    return parseFloat(
      (
        netto_discount +
        netto_discount * params.getValue(params.id, "vat")
      ).toFixed(2)
    );
  };

  const getDiscountNettoPrice = (params) => {
    const netto = params.getValue(params.id, "price_netto");

    return parseFloat(
      (netto - (netto * params.getValue(params.id, "discount")) / 100).toFixed(
        2
      )
    );
  };

  // Client-side validation
  // To validate the value in the cells, first add a preProcessEditCellProps callback to the column definition of the field to validate. Once it is called, validate the value provided in params.props.value. Then, return a new object contaning params.props and also the error attribute set to true or false. If the error attribute is true, the value never will be committed.
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

/*
      "id": 6,
      "name": "Barramoundi",
      "price_netto": 468.06,
      "discount": 0.24,
      "vat": 0.08,
      "currency": "EUR",
      "unit": "kg",
      "quality": "L",
      "use_by_date": "2022/11/06",
      "origin": "Indonesia",
      "producer": "Ortiz and Sons",
      "email_contact": "ttomley5@163.com"
*/
