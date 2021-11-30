import React from "react";
import {
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

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
  console.log(props.input);
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

  const fieldStyling = () => (value ? { pb: 0 } : { pb: "10px" });

  console.log("SelectComp: ");
  console.log(restInput);
  console.log(rest);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      {/* <InputLabel id="label-favorite-color">Fav Color</InputLabel> */}
      <InputLabel id="label-favorite-color">{rest.label}</InputLabel>
      <Select
        name={name}
        labelId="label-favorite-color"
        id="fav_col"
        error={meta.error && meta.touched}
        // inputProps={rest}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        // input={<OutlinedInput label={rest.label} />}
        label={rest.label}
        variant="outlined"
        color="primary"
        required
        sx={fieldStyling}
        // sx={value ? { pb: 0 } : { pb: "10px" }}
        // sx={fieldStyle}
        // sx={{
        //   // "& .MuiSelect-select": {
        //   "& .MuiSelect-outlined": {
        //     padding: "10px",
        //     paddingBottom: "20px",
        //   },
        // }}
        size="small"
        placeholder={rest.placeholder}
        // MenuProps={MenuProps}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {rest.options.map((opt) => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
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


        */
