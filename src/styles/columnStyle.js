import  * as colors from "@mui/material/colors";
import { getColor, getColorContrast } from "./styleFn";


export const stylingCol = {
    iconEdit: (theme) => ({
        color: theme.palette.primary.dark,
        "&:hover": {
          bgcolor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
        },
      }),
      iconSave: (theme) => ({
        color: getColor(colors.cyan[700], theme.palette.mode),
        "&:hover": {
          bgcolor: getColor(colors.cyan[700], theme.palette.mode),
          color: getColorContrast(colors.cyan[700], theme.palette.mode),

        },
      }),
      iconView: (theme) => ({
        color: getColor(colors.purple[700], theme.palette.mode),
        "&:hover": {
          bgcolor: getColor(colors.purple[700], theme.palette.mode),
          color: getColorContrast(colors.purple[700], theme.palette.mode),
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
          bgcolor: getColor(colors.grey[600], theme.palette.mode),
          color: theme.palette.error.contrastText,
        },
      }),
      iconOK: (theme) => ({
        color: getColor(colors.green[800], theme.palette.mode),
      }),
      iconError: (theme) => ({
        color: theme.palette.error.main,
      })
    
  }