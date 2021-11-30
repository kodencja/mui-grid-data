import React from "react";
import {
  Container,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const RadioComp = (props) => {
  const {
    input: { name, onChange, onBlur, value, ...restInput },
    meta,
    ...rest
  } = props;

  // console.log("Radio: ");
  // console.log(restInput.type);
  // console.log(rest);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{name}</FormLabel>
      <RadioGroup
        row
        aria-label="job-status"
        defaultValue="unemployed"
        // name="job-status-radio"
        {...rest}
        name={name}
        // helperText={meta.touched ? meta.error : undefined}
        error={meta.error && meta.touched}
        // inputProps={restInput}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        // sx={{ display: "flex", flexWrap: "wrap" }}
      >
        <FormControlLabel
          control={<Radio color="secondary" type={`${restInput.type}`} />}
          label="employed"
          value="employed"
          name="employed"
        />
        <FormControlLabel
          control={
            <Radio
              color="secondary"
              type={`${restInput.type}`}
              // inputProps={restInput.type}
              // type="radio"
              //   {...rest}
              //   name={name}
              //   helperText={meta.touched ? meta.error : undefined}
              //   error={meta.error && meta.touched}
              //   inputProps={restInput}
              //   onChange={onChange}
              //   value={value}
            />
          }
          label="unemployed"
          value="unemployed"
          name="unemployed"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioComp;
