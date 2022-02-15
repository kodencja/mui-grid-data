import * as colors from "@mui/material/colors";
import {
  getBackgroundColor,
  getHoverBackgroundColor,
  getColor,
  getColorContrast,
} from "./styleFn";

export const tableStyle = (theme) => {
  return {
    headersAndCells: {
      "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 700,
        color: colors.blueGrey[900],
        lineHeight: "1rem",
        whiteSpace: "normal",
        wordWrap: "break-word",
        overflow: "visible",
      },
      "& .MuiDataGrid-cell": {
        fontWeight: 500,
      },
      "& .Mui-error": {
        backgroundColor: colors.pink[500],
        color: theme.palette.error.contrastText,
      },
      "& .id": {
        backgroundColor: getBackgroundColor(
          colors.blueGrey[50],
          theme.palette.mode
        ),
      },
      "& .name": {
        color: getColorContrast(
          colors.grey[100],
          theme.palette.mode === "dark" ? "light" : "dark"
        ),
        fontWeight: "500",
        fontFamily: "Ubuntu",
      },
      "& .price_netto": {
        color: getColor(colors.indigo[800], theme.palette.mode),
        fontWeight: "bold",
      },
      "& .brutto": {
        fontWeight: "bold",
        color: getColor(colors.indigo[900], theme.palette.mode),
      },
      "& .netto": {
        color: getColor(colors.indigo[700], theme.palette.mode),
        fontWeight: "bold",
      },
      "& .discount": {
        color: getColor(colors.purple[900], theme.palette.mode),
      },
      "& .currency": {
        color: colors.blueGrey[800],
      },
      "& .quality": {
        fontWeight: '700',
      },
      "& .useByDate": {
        color: colors.deepPurple[800],
      },
      "& .producer": {
        color: colors.brown[800],
      },
      "& .gray": {
        backgroundColor: colors.grey[100],
      },
      "& .action": {
        backgroundColor: getBackgroundColor(
          colors.grey[50],
          theme.palette.mode
        ),
      },
      "& .even": {
        backgroundColor: getBackgroundColor(
          colors.blueGrey[100],
          theme.palette.mode
        ),
      },
    },

    rowStyling: {
      height: 400,
      width: 1,
      "& .sell-priority-high": {
        backgroundColor: getBackgroundColor(
          colors.orange["A200"],
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getHoverBackgroundColor(
            colors.orange["A200"],
            theme.palette.mode
          ),
        },
      },
      "& .sell-priority-medium": {
        backgroundColor: getBackgroundColor(
          colors.orange["A100"],
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getHoverBackgroundColor(
            colors.orange["A100"],
            theme.palette.mode
          ),
        },
      },
      "& .out-of-date": {
        backgroundColor: getBackgroundColor(
          colors.deepOrange[200],
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getHoverBackgroundColor(
            colors.deepOrange[200],
            theme.palette.mode
          ),
        },
      },
      "& .discount-top": {
        backgroundColor: getBackgroundColor(
          colors.lime["A400"],
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getHoverBackgroundColor(
            colors.lime["A400"],
            theme.palette.mode
          ),
        },
      },
      "& .discount-high": {
        backgroundColor: getBackgroundColor(
          colors.lime["A200"],
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getHoverBackgroundColor(
            colors.lime["A200"],
            theme.palette.mode
          ),
        },
      },
      "& .discount-medium": {
        backgroundColor: getBackgroundColor(
          colors.yellow["A100"],
          theme.palette.mode
        ),
        "&:hover": {
          backgroundColor: getHoverBackgroundColor(
            colors.yellow["A100"],
            theme.palette.mode
          ),
        },
      },
    },
  };
};
