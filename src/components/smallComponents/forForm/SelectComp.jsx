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
    >
      <InputLabel id={rest.label}>{rest.label}</InputLabel>
      <Select
        name={name}
        labelId={rest.label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        label={rest.label}
        variant="outlined"
        color="primary"
        required={rest.required}
        placeholder={rest.placeholder}
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
            defaultValue={rest.defaultValue}
          >
            {opt} {rest.sign ? rest.sign : ""}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{meta.touched ? meta.error : undefined}</FormHelperText>
    </FormControl>
  );
};

export default SelectComp;
