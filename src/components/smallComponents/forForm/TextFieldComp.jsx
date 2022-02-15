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
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import useSomeStyles from "../../customHooks/useSomeStyles";
import {
  checkPropType,
  returnErrorIfPropTypeInvalid,
} from "../../../functions/validation/checkPropTypes";

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

TextFieldComp.propTypes = {
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
      return returnErrorIfPropTypeInvalid(props, propName);
    }
  }),
};

export default TextFieldComp;
