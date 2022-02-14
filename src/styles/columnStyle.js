import  * as colors from "@mui/material/colors";


export const stylingCol = {
    iconEdit: (theme) => ({
        color: theme.palette.primary.dark,
        "&:hover": {
          bgcolor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
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
      }),
      iconCancel: (theme) => ({
        color: theme.palette.text.primary,
        "&:hover": {
          bgcolor: theme.palette.text.disabled,
          color: theme.palette.error.contrastText,
        },
      }),
      iconOK: (theme) => ({
        color: theme.palette.success.light,
      }),
      iconError: (theme) => ({
        color: theme.palette.error.main,
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