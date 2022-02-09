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

const useStyles = makeStyles({
  textInput: {
    backgroundColor: "snow",
    fontSize: "16px",
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "10px",
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

const TextFieldComp = (props) => {
  const getFieldStyle = () => {
    // sx={name === "discount" ? fieldStyle.dateWidth : undefined}
    if (name === "discount") {
      return {
        dateWidth: {
          "& .MuiInputBase-root": {
            width: "60%",
          },
        },
      };
    } else if (restInput.type === "date") {
      return {
        dateMargin: {
          marginTop: "30px",
        },
      };
    }
  };

  const fieldStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "10px",
    shorterWidth: {
      "& .MuiInputBase-root": {
        width: "60%",
      },
    },
    highTopMargin: {
      "& .MuiInputBase-root": {
        marginTop: "17.25px",
      },
    },
  };

  // console.log("Props input: ");
  // console.log(props.input);
  // console.log("props");
  // console.log(props);

  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;
  const classes = useStyles({ name: name });
  // console.log("TextFieldCompo: ");
  // console.log(restInput);
  // console.log(rest); // sign, required
  // console.log("meta.error");
  // console.log(name);
  // console.log(meta.error);
  // console.log("meta.touched");
  // console.log(meta.touched);

  // const getClassRoot = () =>{
  //   restInput.type === "date"
  // }

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
