import React, { useState, useEffect } from "react";
import {
  GridCellParams,
  GridApi,
  // useGridApiRef,
  esES,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridActionsCellItem,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { FormControl, Select, Typography, InputLabel, OutlinedInput, MenuItem, Checkbox, ListItemText, TextField } from "@mui/material";
// import {EditIcon, CancelIcon, DeleteIcon, SaveIcon } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PreviewIcon from '@mui/icons-material/Preview';
import {list_of_countries} from '../../constants/countries';
import {currencies, units, discounts, vat, qualities} from '../../constants/array_in_columns';
import { format, parseISO, formatISO } from "date-fns";

// const useColumns = (handleOpen, classes) => {
const useColumns = (handleOpen) => {
  // const [selectVal, setSelectVal] = useState({'vat': });
  const [quality, setQuality] = useState('');

  // useEffect(()=>{
  //   alternateCols();
  // },[columnsAll])

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
    // e.stopPropagation(); // don't select this row after clicking

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
    // console.log(params.id);
    params.api.commitRowChange(params.id);
    params.api.setRowMode(params.id, "view");
    const row = params.api.getRow(params.id);
    params.api.updateRows([{ ...row }]);
  };

  // const handleCancelClick = (id) => (event) => {
  const handleCancelClick = (event, params) => {
    event.stopPropagation();
    const api = params.api;
    // console.log(api.getRowMode(params.id));
    api.setRowMode(params.id, "view");
  };

  const handleSelectClick = (e, val) =>{
    console.log(e);
    console.log(e.target.value);
    console.log(val);
    setQuality(e.target.value);
    console.log('quality');
    console.log(quality);
  }

  const getBruttoPrice = (params) => {
    const netto_discount = params.getValue(params.id, "discount_netto");
    return parseFloat(
      (
        netto_discount + netto_discount * (params.getValue(params.id, "vat"))
      ).toFixed(2)
    );
  };

  const getDiscountNettoPrice = (params) => {
    const netto = params.getValue(params.id, "price_netto");
    // return parseFloat(
    //   (
    //    netto - (netto * params.getValue(params.id, "discount"))
    //   ).toFixed(2)
    // );
    return parseFloat(
      (
       netto - (netto * params.getValue(params.id, "discount")/100 )
      ).toFixed(2)
    );
  };

  const alternateCols = () => {
    const alterCols= columnsAll.filter((el) => (el.hide === false )).map((elem, ind)=> ind%2 === 0);
console.log(alterCols);
  };

  const checkFloat = (val) => {
    if (!isNaN(val)) {
      return parseFloat(val/10 + val/100);
    } else return val;
  }

 
  // Client-side validation
  // To validate the value in the cells, first add a preProcessEditCellProps callback to the column definition of the field to validate. Once it is called, validate the value provided in params.props.value. Then, return a new object contaning params.props and also the error attribute set to true or false. If the error attribute is true, the value will never be committed.
  const columnsAll = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerClassName: "data-grid-header",
    },
    {
      // field: "firstName",
      // headerName: "First name",
      field: "name",
      headerName: "Name",
      // headerAlign: "center",
      width: 180,
      // height: 'max-content',
      // error: true,
      editable: true,
      // preProcessEditCellProps: (params) => {
      //   const hasError = params.props.value.length < 5;
      //   return { ...params.props, error: hasError };
      // },
      // preProcessEditCellProps: (params) => {
      //   // console.log("preProcessEditCellProps");
      //   return new Promise((resolve) =>{
      //     const hasError = params.props.value.length < 5;
      //     // console.log(params);
      //     console.log(hasError);
      //     resolve ({ ...params.props, error: hasError });
      //   })
      // },
    },
    {
      field: "price_netto",
      headerName: "Netto",
      type: "number",
      // headerAlign: "center",
      width: 90,
      editable: true,
      headerClassName: "data-grid-header",
      // valueParser: (value) => Number(value) / 10
      // preProcessEditCellProps: async (params) => {
      //   // console.log("preProcessEditCellProps");
      //   return new Promise((resolve) =>{
      //     const hasError = params.props.value < 5;
      //     // console.log(params);
      //     console.log(hasError);
      //     resolve ({ ...params.props, error: hasError });
      //   })
      // },
      // preProcessEditCellProps: (params) => {
      //   const hasError = params.props.value < 5;
      //   return { ...params.props, error: hasError };
      // },
    },
    {
      field: "discount",
      headerName: "Discount",
      // type: "number",
      // step: 0.1,
      // headerAlign: "center",
      align: "right",
      width: 90,
      editable: true,
      headerClassName: "data-grid-header",
      type: "singleSelect",
      // valueOptions: [0,0.05,0.1,0.15, 0.2,0.25,0.3,0.4,0.5,0.6,0.7,0.8,0.9],
      // valueOptions: new Array(100).fill(0).map((el,i) => parseInt((i+1)/100)),
      valueOptions: discounts,
      // valueOptions: new Array(100).fill(0).map((el,i) => parseInt((i+1))),
      valueFormatter: (params) => {
        // console.log(params);
        // return `${(parseFloat(params.value * 100).toFixed(2))} %`;
        // return `${(Number(params.value * 100).toLocaleString())} %`;
        // return (parseInt(params.value * 100).toFixed(2));
        // return `${(Number(params.value * 100).toFixed(2))} %`;
        // return `${(parseInt(params.value * 100))} %`;
        // return `${(parseFloat(params.value * 100).toFixed(2))} %`;
        // return parseFloat(params.value * 100).toFixed(2);
        // return parseInt(params.value);
        // return `${parseInt(params.value)} %`;
        return `${params.value} %`;
      },
      // valueGetter: (params) => {
        // return parseInt((params.value / 100));
        // return Number((params.value / 100));
        // return parseFloat((params.value / 100).toFixed(2));
        // return parseFloat((params.value / 100).toFixed(2));
      // },
      // valueSetter: (params) => {
        // return parseInt((params.value / 100));
        // return Number((params.value / 100));
        // return parseFloat((params.value / 100).toFixed(2));
        // return parseFloat((params.value / 100).toFixed(2));
      // },
      // renderEditCell: (params) => {
      //   console.log(params);
      //   return (
      //     <TextField 
      //       inputProps= { {max: 100, min: 10 }} {...params} />
      //     // <input onChange={params.onChange} type="number" step={0.1} format="#0.00%" {...params} />
      //   )
      // }
      // valueParser: (value) => checkFloat(value),
      // valueParser: (value) => (Number(value) / 100).toFixed(2),
      // valueSetter: (params) =>{
        // return parseFloat(params.value);
        // return parseFloat((params.value * 100).toFixed(2));
      // }
      // renderCell: (params) => {
      //   console.log(params);
      //   return (
      //     <input type="number" step={0.1} value={params.value} {...params} />
      //   )
      // }
    },
    {
      field: "discount_netto",
      headerName: "Discount netto",
      type: "number",
      // headerAlign: "center",
      width: 110,
      // editable: true,
      headerClassName: "data-grid-header",
      // valueParser: (value) => Number(value) / 10
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
      // valueOptions: [0,0.05,0.08,0.23],
      valueFormatter: (params) => {
        // const valFormatted = Number(params)
        return `${params.value * 100} %`;
      },
    },
    {
      field: "brutto",
      headerName: "Brutto",
      type: "number",
      // step: 0.1,
      // headerAlign: "center",
      width: 90,
      // editable: true,
      // valueFormatter: (params) => {
      //   const valueFormatted = parseFloat(params.value);
      //   return `${valueFormatted}`;
      // },
      // valueParser: (value) => parseFloat(value/10),
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
      // valueOptions: ['EUR','USD','GBP', 'PLN', 'CNY'],
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 90,
      editable: true,
      type: "singleSelect",
      valueOptions: units,
      // valueOptions: ['kg','box','bag','piece'],
    },
    {
      field: "quality",
      headerName: "Quality: Top, Medium, Low",
      align: "center",
      // headerName: (
      //   <Typography sx={styles.customHeaderCell}>
      //     Quality: Top, Medium, Low
      //   </Typography>
      // ),
      // headerName: <Typography className={classes.headers} >Quality: Top, Medium, Low</Typography>,
      width: 80,
      type: "singleSelect",
      valueOptions: qualities,
      // valueOptions: ['T','M','L'],
      editable: true,
    },
    {
      field: "use_by_date",
      headerName: "Use by date",
      type: 'date',
      align: "right",
      width: 130,
      editable: true,
      // valueFormatter for displaying
      valueFormatter: (params) => {
        // first converts to JS Date, then to locale option through date-fns
        // return format(new Date(2016, 0, 1), 'dd/MM/Y');
        // return format(new Date(params.value), 'dd/MM/Y');
        return format(new Date(params.value), 'Y-MM-dd');
        // console.log(params.value);
        // return format(parseISO(params.value), 'dd/MM/Y');
        // return format(parseISO(params.value), 'MM/dd/yyyy');
      },
      // valueGetter for filtering
      valueGetter: (params) => {

        return format(new Date(params.value), 'Y-MM-dd');
      },
    },
    {
      field: "origin",
      headerName: "Country of origin",
      width: 130,
      editable: true,
      align: "right",
      type: "singleSelect",
      valueOptions: list_of_countries
    },
    {
      field: "producer",
      headerName: "Producer",
      width: 160,
      editable: true,
    },
    {
      field: "email_contact",
      headerName: "Email contact",
      width: 160,
      editable: true,
    },
    {
      field: "action",
      type: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const rowModeInEdit = params.api.getRowMode(params.id) === "edit";
        // console.log('PARAMS');
        // console.log(params);
        // console.log(params.api);
        // console.log(rowModeInEdit);

        if (rowModeInEdit) {
          return (
            <>
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                // onClick={handleSaveClick(id)}
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
                onClick={(e) => handleOpen(params, 'view')}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                // onClick={(e) =>handleDeleteClick(e, params)}
                onClick={() => handleOpen(params, 'del')}
                color="inherit"
              />
            </>
          );
        }

        // return <EditIcon onClick={(e) => handleOnClick(e, params.id)}/>;
        // return <Button onClick={handleOnClick}><EditIcon /></Button>;
        // return <Button onClick={onClick}>Click</Button>;
      },
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


            preProcessEditCellProps: (params) => {
        // console.log("preProcessEditCellProps");
        return new Promise((resolve) =>{
          const hasError = params.props.value < 1;
          // console.log(params);
          console.log(hasError);
          resolve ({ ...params.props, error: hasError });
        })
      },
*/