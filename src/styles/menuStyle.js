import {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    amber,
    orange,
    deepOrange,
    brown,
    grey,
    blueGrey,
    yellow,
  } from "@mui/material/colors";

export const menuStyle1 =  {
    iconMenu: {
      // color: yellow["A100"],
      color: lime[100],
      // color: purple[200],
    },
    textMenu: {
      // color: yellow[50],
      color: lime[50],
    },
  };

  export const menuStyle = (theme) => {
      return {
    iconMenu: {
        // color: yellow["A100"],
        color: lime[100],
        // color: purple[200],
      },
      textMenu: {
        // color: yellow[50],
        color: lime[50],
      },
    //   colorPaper: {
    //     "& .MuiMenu-paper": {
    //         bgcolor: theme.palette.primary.main,
    //         color: theme.palette.text.secondary,
    //       },
    //   }
    //   colorPaper: {
    //     "& .MuiMenu-paper": {
    //         bgcolor: theme.palette.primary.main,
    //         color: theme.palette.text.secondary,
    //       },
    //   }
  }
}