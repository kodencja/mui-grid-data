import  * as colors from "@mui/material/colors";

export const modalStyle = (matches) => {
  return {
    color: colors.yellow["50"],
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "95%",
    minWidth: matches ? "80%" : "50%",
    maxHeight: "95vh",
    bgcolor: colors.grey[800],
    border: "2px solid #E9F1E9",
    boxShadow: 24,
    p: 3,
    textAlign: "center",
    overflow: matches ? "scroll" : "auto",
  };
}