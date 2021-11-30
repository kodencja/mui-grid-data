import React from "react";
import {
  Container,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
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
});

// const TextFieldComp = ({ label, placeholder }) => {
const TextFieldComp = (props) => {
  const classes = useStyles();

  const fieldStyle = {
    marginTop: "20px",
    marginBottom: "20px",
    marginRight: "10px",
    // bgcolor: "seashell",
    // display: "block",
    // "& .MuiOutlinedInput-input": {
    "& .MuiInputBase-root-MuiOutlinedInput-root": {
      bgcolor: "snow",
      border: "1px solid green",
      // backgroundColor: "snow",
    },
  };

  // console.log("Props input: ");
  // console.log(props.input);

  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  console.log("TextFieldCompo: ");
  // console.log(restInput);
  console.log(rest);

  // console.log(meta);
  // console.log(meta.touched);
  // console.log(meta.error);

  return (
    // <div className={classes.textInput}>
    <TextField
      name={name}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      inputProps={rest}
      onChange={onChange}
      onBlur={onBlur}
      // onBlur={(event) => onBlur(event)}
      value={value}
      label={rest.label}
      variant="outlined"
      color="primary"
      required
      placeholder={rest.placeholder}
      // className={classes.textInput}
      // sx={{
      //   "& .MuiTextField-root": { m: 5, width: "25ch" },
      // }}
      sx={fieldStyle}
      // sx={{ ...fieldStyle }}
    />
    // {/* </div> */}
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
*/
