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

  const { useStylesTextComp } = useSomeStyles();
  const classes = useStylesTextComp({ name: name });
  // console.log("TextFieldCompo: ");

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
