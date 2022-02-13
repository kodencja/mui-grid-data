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
import PropTypes from "prop-types";

const SelectComp = (props) => {
  // console.log(props.input); // {name: 'toppings', onBlur: ƒ, onChange: ƒ, …}
  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

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
