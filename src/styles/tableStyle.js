import  * as colors from "@mui/material/colors";

export const tableStyle = { 
    
    headersAndCells: {
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
      // overflow: "scroll",
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
      // overflowX: "visible !important",
    },
    '& .Mui-error': {
      // backgroundColor: `rgba(12, 12, 12, 0.7)`,
      color: '#ff4343',
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
  }
}