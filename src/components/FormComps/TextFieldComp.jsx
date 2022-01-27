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

// const TextFieldComp = ({ label, placeholder }) => {
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
    // paddingLeft: "15px",
    // bgcolor: "seashell",
    // display: "block",
    // "& .MuiOutlinedInput-input": {
    // "& .MuiInputBase-root-MuiOutlinedInput-root": {
    // "& .MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input":
    // "& .MuiInputBase-input-MuiInput-input": {
    // "& .MuiInput-input MuiInputBase-input": {

    // "& .MuiInputBase-input-MuiInput-input": {
    //   bgcolor: "lightyellow",
    //   border: "1px solid green",
    //   paddingLeft: "15px",
    //   backgroundColor: "seashell",
    // },

    "& .MuiInput-root MuiInput-underline MuiInputBase-root": {
      // MuiInputBase-colorPrimary MuiInputBase-formControl css-1480iag-MuiInputBase-root-MuiInput-root": {
      // backgroundColor: "snow",
    },
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
  // console.log(meta.touched);

  // const getClassRoot = () =>{
  //   restInput.type === "date"
  // }

  return (
    // <div className={classes.textInput}>
    // <Box>
    //   {restInput.type === "date" ? (
    //     <InputLabel id={rest.label}>{rest.label}</InputLabel>
    //   ) : (
    //     ""
    //   )}
    <TextField
      name={name}
      type={restInput.type}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      // error={
      //   restInput.type === "date" && value === "dd.mm.rrrr"
      //     ? meta.error
      //     : meta.error && meta.touched
      // }
      // inputProps={name === "discount" ? rest.inputProps : rest}
      // inputProps={
      //   name === "discount" ? { inputMode: "numeric", pattern: "[0-9]*" } : rest
      // }
      inputProps={rest}
      // pattern={rest.pattern}
      // inputmode={rest.inputMode}
      // min={rest.minDate}
      min={rest.min}
      max={rest.max}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={rest.defaultValue}
      // onBlur={(event) => onBlur(event)}
      // value={rest.sign ? Number(value) : value} // to co się wyświetla w inpucie
      // value={rest.sign ? Number(parseInt(value) / 10) : value} // to co się wyświetla w inpucie
      // value={name === "discount" ? Number(value) : value}
      value={value}
      // value={rest.sign ? Number(value) / 100 : value}
      // value={rest.sign ? Number(value) * 10 : value}
      label={restInput.type !== "date" ? rest.label : ""}
      variant="standard"
      // min={rest.minDate}
      // InputLabelProps={
      //   restInput.type === "date" ? { shrink: true } : { shrink: false }
      // }
      // variant="outlined"
      // color="info"
      required={rest.required}
      placeholder={rest.placeholder}
      // sx={{
      //   "& .MuiTextField-root": { m: 5, width: "25ch" },
      // }}
      // sx={fieldStyle}
      className={classes.root}
      // className={getClassRoot}
      // sx={{ marginTop: "50px" }}

      // sx={
      //   name === "discount"
      //     ? fieldStyle.shorterWidth
      //     : restInput.type === "date"
      //     ? fieldStyle.highTopMargin
      //     : undefined
      // }

      // sx={getFieldStyle()}
      // sx={fieldStyle.dateWidth}
      // style={{ "&:after": { paddingLeft: "20px" } }}
      // style={{ marginLeft: "-10px" }}

      InputProps={{
        // startAdornment: (
        //   <InputAdornment position="start" sx={{ ml: "25px" }}>
        //     %
        //   </InputAdornment>
        // ),
        endAdornment: rest.sign ? (
          <InputAdornment position="end" sx={{ mr: "5px" }}>
            {rest.sign}
          </InputAdornment>
        ) : (
          ""
        ),
      }}

      // startAdornment={
      //   <InputAdornment
      //     position="start"
      //     // sx={{ textAlign: "left" }}
      //     // sx={{ "&::after": { mr: "25px" } }}
      //     // sx={{ "& .MuiTypography-root": { mr: "25px" } }}
      //     // sx={{ position: "absolute", left: "50px", top: 0 }}
      //   >
      //     {rest.sign}
      //   </InputAdornment>
      // }
      // endAdornment={
      //   // startAdornment={
      //   rest.sign ? (
      //     <InputAdornment
      //       position="end"
      //       // sx={{ textAlign: "left" }}
      //       // sx={{ "&::after": { mr: "25px" } }}
      //       // sx={{ "& .MuiTypography-root": { mr: "25px" } }}
      //       // sx={{ position: "absolute", left: "50px", top: 0 }}
      //     >
      //       {rest.sign}
      //     </InputAdornment>
      //   ) : (
      //     ""
      //   )
      // }
    />
    // </Box>
  );
};

export default TextFieldComp;

/* <TextField
name={name}
helperText={meta.touched ? meta.error : undefined}
error={meta.error && meta.touched}
inputProps={rest}
onChange={onChange}
value={value}
label={rest.label}
variant="outlined"
color="primary"
required
placeholder={rest.placeholder}
sx={{ ...fieldStyle }}
/> 



    <TextField
      {...rest}
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={restInput}
      onChange={onChange}
      value={value}
    />



          <TextField
        name={name}
        helperText={meta.touched ? meta.error : undefined}
        error={meta.error && meta.touched}
        inputProps={rest}
        onChange={onChange}
        value={value}
        label={rest.label}
        variant="outlined"
        color="primary"
        required
        placeholder={rest.placeholder}
        sx={{ ...fieldStyle }}
      />


            <TextField
        name={props.input && props.input.name}
        helperText={
          props.meta && props.meta.touched ? props.meta.error : undefined
        }
        error={props.meta && props.meta.error && props.meta.touched}
        inputProps={props.rest}
        onChange={props.input && props.input.onChange}
        value={props.input && props.input.value}
        label={props.input && props.rest && props.rest.label}
        variant="outlined"
        color="primary"
        required
        placeholder={props.rest && props.rest.placeholder}
        sx={{ ...fieldStyle }}
      />




        console.log(restInput); // {checked: undefined, type: 'text', onFocus: ƒ}
  console.log(rest); // {label: 'First Name', placeholder: 'First Name', children: undefined, render: undefined}

  console.log(meta); // { active: false
  data: Object
  dirty: true
  dirtySinceLastSubmit: false
  error: undefined
  initial: undefined
  invalid: false
  length: undefined
  modified: true
  modifiedSinceLastSubmit: false
  pristine: false
  submitError: undefined
  submitFailed: false
  submitSucceeded: false
  submitting: false
  touched: true
  valid: true
  validating: false
  visited: false }
  console.log(meta.touched);
  console.log(meta.error);
*/
