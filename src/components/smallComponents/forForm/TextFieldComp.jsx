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
import useSomeStyles from "../../../styles/useSomeStyles";
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

  //   console.log("meta");
  // console.log(meta);
  // console.log("rest");
  // console.log(rest);
  // console.log("restInput");
  // console.log(restInput);

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
      // sx={
      //   name === "discount"
      //     ? fieldStyle.shorterWidth
      //     : restInput.type === "date"
      //     ? fieldStyle.highTopMargin
      //     : undefined
      // }

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
  name: PropTypes.string, 
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string, 
  restInput: PropTypes.shape({
    type: PropTypes.string,
    checked: PropTypes.bool,
    onFocus: PropTypes.func,
  }),
  rest: PropTypes.shape({
    label: PropTypes.string,
    min: PropTypes.string,
    required: PropTypes.bool,
  }),
  meta: PropTypes.objectOf((props, propName) => {
          if (!checkPropType(props, propName, "object", "number", "string", "boolean", "undefined")) {
            // console.log(props[propName]);
            return returnErrorIfPropTypeInvalid(props, propName);
          }
      },)
}

export default TextFieldComp;
