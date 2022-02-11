import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField } from "@mui/material";
import useSomeStyles from "../../../styles/useSomeStyles";
import { makeStyles } from "@mui/styles";
import * as colors from "@mui/material/colors";

const DateComp = (props) => {
  // const { useStylesDateComp } = useSomeStyles();
  // const classes = useStylesDateComp();

  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  const useStyles = makeStyles({
    root: {
      marginTop: "10px",
      marginBottom: "10px",
      marginRight: "10px",
      maxWidth: "200px",
      "& .MuiInputBase-root": {
        //   paddingLeft: 10,
      },
      // QUITE GOOD
      // "& .MuiInput-underline.MuiInputBase-formControl.Mui-focused": {
      "& .MuiInput-underline.Mui-focused": {
        // backgroundColor: "burlywood",
        //   backgroundColor: "#e8f0fe",
        //   color: "darkslategray",
      },
      // "& .MuiInputBase-root-MuiOutlinedInput-root.Mui-error.Mui-error": {
      // borderColor: "blue",
      // color: "blue",
      // width: 120,
      // },
    },
    datePicker: {
      "& .MuiCalendarPicker-root": {
        // "& .MuiCalendarPicker-viewTransitionContainer": {
        // backgroundColor: colors.grey[300],
        backgroundColor: "coral",
        // "& .MuiPaper-root": {
        // backgroundColor: colors.grey[200] + " !important",

        // bgcolor: "black !important",
        color: colors.blue[500],
        // },
      },
    },
  });

  const classes = useStyles();

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
