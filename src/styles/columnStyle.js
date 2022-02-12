import  * as colors from "@mui/material/colors";

//   export const columnStyle = {

//     textPrimary: {
//         color: colors.blue[500],
//         // color: theme.palette.text.primary,
//       },
//   }



  export const columnStyle = (theme) => {
      return {
        actions: {
            // color: theme.palette.text.secondary,
            color: colors.blue[500],
          },
          textPrimary: {
            // color: theme.palette.text.primary,
            color: colors.green[500],
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
        }
    }