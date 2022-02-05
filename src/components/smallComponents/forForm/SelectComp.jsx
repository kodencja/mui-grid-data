import React from "react";
import {
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import { Stack } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectComp = (props) => {
  // console.log(props.input); // {name: 'toppings', onBlur: ƒ, onChange: ƒ, …}
  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  const fieldStyle = {
    // marginTop: "20px",
    // marginBottom: "20px",
    // minWidth: "100px",
    // display: "block",
    pb: "10px",
    // "& .MuiSelect-outlined .MuiOutlinedInput-input": {
    // "& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
    "& .MuiSelect-outlined": {
      // pt: "8.5px",
      // pb: "10px",
    },
  };

  const fieldStyling = { position: "relative", pb: "10px", textAlign: "right" };
  // const fieldStyling = { position: "relative", pb: "10px", textAlign: "right" };
  // const fieldStyling = () =>
  //   value
  //     ? { pb: 0, position: "relative" }
  //     : { pb: "10px", position: "relative" };

  // if (name === "currency") {
  //   console.log("SelectComp: ");
  //   console.log(meta);
  //   console.log("Select meta.error: ");
  //   console.log(meta.error);
  //   console.log(meta.touched);
  // }

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      error={meta.error && meta.touched}
      // helperText={meta.touched ? meta.error : undefined}
    >
      {/* <InputLabel id="label-favorite-color">Fav Color</InputLabel> */}
      <InputLabel id={rest.label}>{rest.label}</InputLabel>
      <Select
        name={name}
        labelId={rest.label}
        // id={rest.label}

        // inputProps={rest}
        onChange={onChange}
        onBlur={onBlur}
        // value={value}
        value={value}
        // input={<OutlinedInput label={rest.label} />}
        label={rest.label}
        variant="outlined"
        color="primary"
        required={rest.required}
        // endAdornment={
        //   // startAdornment={
        //   rest.sign ? (
        //     <Button
        //       position="start"
        //       disabled
        //       // sx={{ textAlign: "left" }}
        //       // sx={{ "&::after": { mr: "25px" } }}
        //       // sx={{ "& .MuiTypography-root": { mr: "25px" } }}
        //       // sx={{ position: "absolute", left: "50px", top: 0 }}
        //     >
        //       {rest.sign}
        //     </Button>
        //   ) : (
        //     ""
        //   )
        // }
        // endAdornment={
        //   // startAdornment={
        //   rest.sign ? (
        //     <InputAdornment
        //       position="start"
        //       disableTypography
        //       // sx={{ textAlign: "left" }}
        //       sx={{ "&::after": { mr: "25px" } }}
        //       // sx={{ "& .MuiTypography-root": { mr: "25px" } }}
        //       // sx={{ position: "absolute", left: "50px", top: 0 }}
        //     >
        //       {rest.sign}
        //     </InputAdornment>
        //   ) : (
        //     ""
        //   )
        // }

        // sx={fieldStyling}

        // sx={value ? { pb: 0 } : { pb: "10px" }}
        // sx={fieldStyle}
        // sx={{
        //   // "& .MuiSelect-select": {
        //   "& .MuiSelect-outlined": {
        //     padding: "10px",
        //     paddingBottom: "20px",
        //   },
        // }}

        // size="small"
        placeholder={rest.placeholder}
        // MenuProps={MenuProps}
      >
        {name !== "vat" ? (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        ) : undefined}

        {rest.options.map((opt) => (
          <MenuItem
            key={opt}
            value={name === "quality" ? opt[0] : rest.sign ? opt / 100 : opt}
            // defaultValue={name === "vat" ? 0 : undefined}
            defaultValue={rest.defaultValue}
          >
            {/* {opt} */}
            {opt} {rest.sign ? rest.sign : ""}
            {/* {`${opt}%`} */}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{meta.touched ? meta.error : undefined}</FormHelperText>
    </FormControl>
  );
};

export default SelectComp;

/* <MenuItem value="">
<em>None</em>
</MenuItem>
<MenuItem value="red">Red</MenuItem>
<MenuItem value="yellow">Yellow</MenuItem>
<MenuItem value="blue">Blue</MenuItem> 


        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>

        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>



          console.log(restInput); // {checked: undefined, type: 'select', onFocus: ƒ}
  console.log(rest);  // {label: 'Fav Col', placeholder: 'Fav Col', options: ['red', 'green', 'blue', 'yellow'], children: undefined, render: undefined}
  console.log(meta);  // { active: false
  data: Object
  dirty: false
  dirtySinceLastSubmit: false
  error: undefined
  initial: Array(0)
  invalid: false
  length: 0
  modified: false
  modifiedSinceLastSubmit: false
  pristine: true
  submitError: undefined
  submitFailed: false
  submitSucceeded: false
  submitting: false
  touched: false
  valid: true
  validating: false
  visited: false }

        */
