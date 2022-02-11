import React from "react";
import {
  Container,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  Box,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import useSomeStyles from "../../../styles/useSomeStyles";

const TextFieldComp = (props) => {
  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  // const useStyles = makeStyles({
  //   root: {
  //     marginTop: "15px",
  //     marginBottom: "15px",
  //     marginRight: "15px",
  //     maxWidth: (props) => (props.name === "discount" ? "100px" : "200px"),
  //     // maxWidth: "200px",
  //     "& .MuiInputBase-root": {
  //       paddingLeft: 5,
  //     },
  //     "& .MuiInput-underline.Mui-focused": {
  //       backgroundColor: "#e8f0fe",
  //       color: "darkslategray",
  //     },
  //   },
  // });

  // const { useStylesTextComp } = useSomeStyles();
  // const classes = useStylesTextComp({ name: name });
  // console.log("TextFieldCompo: ");

  // const classes = useStyles({ name: name });

  const useStyles = makeStyles({
    textInput: {
      backgroundColor: "snow",
      fontSize: "16px",
      marginTop: "20px",
      marginBottom: "20px",
      marginRight: "10px",
      // display: "flex",
      // "& .MuiInputBase-root-MuiOutlinedInput-root": {
      // "& .MuiOutlinedInput-input": {
      // "& .MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
      //   {
      // bgcolor: "cornsilk",
      // border: "1px solid green",
      // backgroundColor: "snow",
      // },
    },
    textInputPadding: {
      paddingLeft: "10px",
      // "& .MuiInputBase-input-MuiInput-input": {
      "&:after": {
        // backgroundColor: "lightyellow",
        border: "1px solid green",
        paddingLeft: "15px",
      },
    },
    root: {
      marginTop: "15px",
      marginBottom: "15px",
      marginRight: "15px",
      maxWidth: (props) => (props.name === "discount" ? "100px" : "200px"),
      // maxWidth: "200px",
      "& .MuiInputBase-root": {
        paddingLeft: 5,
      },
      "& .MuiInput-underline.Mui-focused": {
        backgroundColor: "#e8f0fe",
        color: "darkslategray",
      },
    },
  });

  const classes = useStyles({ name: name });

  return (
    <TextField
      name={name}
      type={restInput.type}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={rest}
      min={rest.min}
      max={rest.max}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={rest.defaultValue}
      value={value}
      label={restInput.type !== "date" ? rest.label : ""}
      variant="standard"
      required={rest.required}
      placeholder={rest.placeholder}
      // className={classes.root}
      className={classes.root}
      // sx={
      //   name === "discount"
      //     ? fieldStyle.shorterWidth
      //     : restInput.type === "date"
      //     ? fieldStyle.highTopMargin
      //     : undefined
      // }

      InputProps={{
        endAdornment: rest.sign ? (
          <InputAdornment position="end" sx={{ mr: "5px" }}>
            {rest.sign}
          </InputAdornment>
        ) : (
          ""
        ),
      }}
    />
  );
};

export default TextFieldComp;
