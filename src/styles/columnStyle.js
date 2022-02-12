import  * as colors from "@mui/material/colors";


export const stylingCol = {
    iconEdit: (theme) => ({
        // ...theme.typography.body,
        // color: 'text.primary',
        // color: theme.palette.text.primary,
        // color: theme.palette.info.main,
        color: theme.palette.primary.dark,
        // color: theme.palette.success.light,
        // bgcolor: 'text.primary',
        // color: 'background.paper',
        // bgcolor: theme.palette.warning.main,
        "&:hover": {
          bgcolor: theme.palette.primary.dark,
          // bgcolor: theme.palette.success.light,
          color: theme.palette.primary.contrastText,
          // color: "snow",
        },
      }),
      iconSave: (theme) => ({
        color: theme.palette.success.main,
        "&:hover": {
          bgcolor: theme.palette.success.main,
          color: theme.palette.success.contrastText,

        },
      }),
      iconView: (theme) => ({
        color: theme.palette.secondary.main,
        "&:hover": {
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,

        },
      }),
      iconDel: (theme) => ({
        color: theme.palette.warning.main,
        "&:hover": {
          bgcolor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
        },
      })
    
  }

//   export const columnStyle = {

//     textPrimary: {
//         color: colors.blue[500],
//         // color: theme.palette.text.primary,
//       },
//   }



//   export const columnStyle = (theme) => {
//       return {
//         actions: {
//             // color: theme.palette.text.secondary,
//             color: colors.blue[500],
//           },
//           textPrimary: {
//             // color: theme.palette.text.primary,
//             color: colors.green[500],
//           },
//           headers: {
//             whiteSpace: "normal",
//             wordWrap: "break-word",
//             "& .MuiDataGrid-columnHeaderTitleContainer": {
//               whiteSpace: "normal",
//               wordWrap: "break-word",
//               overflow: "visible",
//               lineHeight: "2rem",
//               alignItems: "flex-start",
//               alignContent: "flex-start",
//             },
//             "& .MuiDataGrid-columnHeaderTitle": {
//               overflow: "visible",
//               lineHeight: "1.43rem",
//               whiteSpace: "normal",
//             },
//             // "& div": {
//             //   whiteSpace: "normal",
//             //   wordWrap: "break-word",
//             //   flexWrap: "wrap",
//             // },
//           },
//         }
//     }