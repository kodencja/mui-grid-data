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
import {
  checkPropType,
  returnErrorIfPropTypeInvalid,
} from "../../../functions/validation/checkPropTypes";

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

SelectComp.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    checked: PropTypes.bool,
    onFocus: PropTypes.func,
  }),
  label: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  required: PropTypes.bool,
  sign: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  meta: PropTypes.objectOf((props, propName) => {
    if (
      !checkPropType(
        props,
        propName,
        "object",
        "number",
        "string",
        "boolean",
        "undefined"
      )
    ) {
      // console.log(props[propName]);
      return returnErrorIfPropTypeInvalid(props, propName);
    }
  }),
};

export default SelectComp;
