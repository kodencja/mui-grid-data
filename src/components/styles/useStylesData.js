import { makeStyles } from "@mui/styles";
import  * as colors from "@mui/material/colors";

// export const dataTableStyle = () => {
// export const useStylesData = () => {
    export const useStylesData = makeStyles({
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
            color: colors.green[900],
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
            backgroundColor: colors.lightBlue[100],
          },
          "& .brutto": {
            backgroundColor: colors.teal[50],
          },
          "& .netto": {
            backgroundColor: colors.lime[100],
          },
          "& .useByDate": {
            backgroundColor: colors.lightGreen[100],
          },
          "& .gray": {
            backgroundColor: colors.grey[100],
          },
        },
      });
    //   const classes = useStylesData();
    //   return useStylesData;
    //   return stylesData();
// }