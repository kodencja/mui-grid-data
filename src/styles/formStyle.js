import  * as colors from "@mui/material/colors";

export const formStyle = (matches) => (
    {
        marginV: {
          marginTop: "10px",
          marginBottom: "10px",
        },
        center: {
          textAlign: "center",
          justifyContent: "center",
        },
        rowBreak: {
          flexBasis: "100%",
          height: "0",
          display: matches ? "flex" : "none",
        },
        break: {
          flexBasis: "100%",
          height: "0",
        },
        rowFlex: {
          // display: matches ? "flex" : "block",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        },
        title: {
          fontSize: "22px",
        },
      }
);