import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import useSomeStyles from "../../../styles/useSomeStyles";
import {
  checkPropType,
  returnErrorIfPropTypeInvalid,
} from "../../../functions/validation/checkPropTypes";

const DateComp = (props) => {
  const { useStylesDateComp } = useSomeStyles();
  const classes = useStylesDateComp();

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

DateComp.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.string,
    checked: PropTypes.bool,
    onFocus: PropTypes.func,
  }),
  label: PropTypes.string,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
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

export default DateComp;
