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

const DateComp = (props) => {
  const classes = useStyles();

  console.log(props);
  // console.log(props.input.value);
  // console.log(props.input.restInput);
  // console.log(props.rest);

  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  // console.log("DateComp: ");
  console.log(restInput); // {checked: undefined, type: 'date', onFocus: ƒ}
  console.log(rest); // children: undefined,   label: "Use by date",   render: undefined,   required: true
  // console.log(rest.value);
  // console.log(value);
  // console.log(onBlur);
  // console.log(meta);
  console.log("meta.error: ");
  console.log(meta.error);
  // console.log(meta.error && true);
  console.log("meta.touched:");
  console.log(meta.touched);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  return (
    // <FormControl
    // helperText={meta.touched ? meta.error : undefined}
    // error={meta.error && true}
    // >
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      className={classes.datePicker}
      // error={meta.error && meta.touched}
      // onChange={onChange}
      // onBlur={onBlur}
      // error={meta.error && true}
      // style={{
      //   backgroundColor: colors.grey[300],
      //   ".MuiCalendarPicker-root": { backgroundColor: colors.grey[300] },
      // }}
      // sx={{
      //   backgroundColor: colors.grey[300],
      //   ".MuiCalendarPicker-root": { backgroundColor: colors.grey[300] },
      // }}

      // style={{ "& .MuiCalendarPicker-root": { backgroundColor: "coral" } }}
      // sx={{
      //   // "& .MuiCalendarPicker-root.MuiCalendarPicker-viewTransitionContainer": {
      //   "& .MuiCalendarPicker-root.MuiPaper-root": {
      //     // backgroundColor: colors.grey[200] + " !important",
      //     backgroundColor: colors.grey[300],
      //     // bgcolor: "black !important",
      //     color: colors.blue[500],
      //   },
      // }}
    >
      <DesktopDatePicker
        name={name}
        label={rest.label}
        value={value}
        // value={value ? value : rest.value}
        // value={value ? value : rest.value}
        onChange={onChange}
        // onBlur={onBlur}
        required={rest.required}
        type={restInput.type}
        // type="date"
        // className={classes.root}
        // error={meta.error && true}
        // error={true}
        // minDate={new Date().setMonth(new Date().getMonth() + 1)}
        // formData.date.setMonth(formData.date.getMonth() + 3)
        minDate={new Date().setDate(new Date().getDate() + 1)}
        // minDate={new Date()}
        // onError={meta.touched && meta.error}
        // error={meta.error && meta.touched}
        // style={{ backgroundColor: "coral" }}
        // style={{
        //   backgroundColor: "coral",
        //   ".MuiCalendarPicker-root": { backgroundColor: colors.grey[300] },
        // }}
        // sx={{
        //   backgroundColor: "coral",
        //   ".MuiCalendarPicker-root": { backgroundColor: colors.grey[300] },
        // }}

        // style={{
        //   backgroundColor: "coral",
        //   "& .MuiCalendarPickerRoot": { backgroundColor: "coral" },
        // }}
        // sx={{
        //   backgroundColor: "coral",
        //   "& .MuiCalendarPickerRoot": { backgroundColor: "coral" },
        // }}
        // mask={"dd/MM/yyyy"}
        // toolbarFormat={"dd/MM/yyyy"}
        // inputFormat={"dd/MM/yyyy"}
        inputFormat="yyyy-MM-dd"
        // renderInput={(params) => <TextFieldComp {...params} />}
        // .MuiCalendarPicker-root. PrivatePickersFadeTransitionGroup-root MuiCalendarPicker-viewTransitionContainer css-1wvgxus-MuiCalendarPicker-viewTransitionContainer
        // sx={{
        //   // "& .MuiCalendarPicker-root.MuiCalendarPicker-viewTransitionContainer": {
        //   // "& .MuiCalendarPicker-root.MuiPaper-root": {
        //   "& .MuiCalendarPicker-root": {
        //     // "& .MuiCalendarPicker-viewTransitionContainer": {
        //     // backgroundColor: colors.grey[300],
        //     backgroundColor: "coral",
        //     // "& .MuiPaper-root": {
        //     // backgroundColor: colors.grey[200] + " !important",

        //     // bgcolor: "black !important",
        //     color: colors.blue[500],
        //     // },
        //   },
        // }}
        renderInput={(params) => {
          console.log(params);
          // params.error = meta.error && true;
          params.error = meta.error && meta.touched;
          return (
            // <input type="date" />
            <TextField
              className={classes.root}
              // onChange={onChange}
              onBlur={onBlur}
              helperText={meta.touched ? meta.error : undefined}
              // helperText={meta.error && meta.touched}
              // helperText="Error"
              // error={meta.error && meta.touched}
              // error={params.error}
              // error={meta.error && true}
              {...params}
            />
          );
        }}
      />
      {/* <FormHelperText>{meta.touched ? meta.error : undefined}</FormHelperText> */}
    </LocalizationProvider>
    // {/* <FormHelperText>Helper text</FormHelperText> */}
    // {/* </FormControl> */}
  );
};

export default DateComp;
