import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField, FormHelperText, FormControl } from "@mui/material";
import TextFieldComp from "./TextFieldComp";
import { makeStyles } from "@mui/styles";
import * as colors from "@mui/material/colors";

const useStyles = makeStyles({
  root: {
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "10px",
    maxWidth: "200px",
  },
});

const DateComp = (props) => {
  const classes = useStyles();

  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        name={name}
        label={rest.label}
        value={value}
        onChange={onChange}
        required={rest.required}
        type={restInput.type}
        minDate={rest.min}
        inputFormat="yyyy-MM-dd"
        renderInput={(params) => {
          // ascribe meta.error to params.error
          params.error = meta.error && meta.touched;
          return (
            <TextField
              className={classes.root}
              onBlur={onBlur}
              helperText={meta.touched ? meta.error : undefined}
              {...params}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};

export default DateComp;
