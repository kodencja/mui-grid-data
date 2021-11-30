import React from "react";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Box,
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
import TextFieldComp from "../components/FormComps/TextFieldComp";
import RadioComp from "../components/FormComps/RadioComp";
import SelectComp from "../components/FormComps/SelectComp";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  title: {
    fontSize: "24px",
  },
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const AddRecord = () => {
  const classes = useStyles();

  let formData = {
    stooge: "larry",
    toppings: [],
    sauces: [],
    employment: "unemployed",
    favCol: "",
  };

  const validate = (values) => {
    const errors = {};
    console.log("VALUES: ");
    console.log(values);
    console.log(values.favCol);
    // console.log(values.employment);
    // console.log(values.employed);
    // console.log(values.unemployed);
    if (!values.firstName) {
      errors.firstName = "This field is required";
    }
    if (!values.lastName) {
      errors.lastName = "This field is required";
    }
    if (!values.favCol) {
      errors.favCol = "This field is required";
    }
    if (values.employment === undefined || !values.employment) {
      errors.employment = "Required";
    }
    return errors;
  };

  return (
    <Container>
      <div className={classes.title}>React Final Form - Simple Example</div>
      <a
        href="https://final-form.org/react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Docs
      </a>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          ...formData,
        }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          // <form onSubmit={handleSubmit} className={styles.form}>
          <Box component="form" onSubmit={handleSubmit}>
            {/* <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap" }}
            > */}
            {/* <div style={{ display: "flex", flexWrap: "wrap" }}> */}
            {/* <FormControl> */}
            <div>
              <Field
                name="firstName"
                type="text"
                label="First Name"
                placeholder="First Name"
                component={TextFieldComp}
                // render={({ input, meta }) => (
                //   <div>
                //     <label>Bio</label>
                //     <textarea {...input} />
                //     <TextFieldComp {...input} {...meta} />
                //     {meta.touched && meta.error && <span>{meta.error}</span>}
                //   </div>
                // )}
              />
              {/* {meta.error && meta.touched && <span>{meta.error}</span>} */}
              {/* </div> */}
              {/* <div> */}
              <Field
                name="lastName"
                component={TextFieldComp}
                type="text"
                label="Last Name"
                placeholder="Last Name"
              />
              {/* </FormControl> */}
              {/* </div> */}
              <div>
                {/* <label>Employed</label> */}
                <Field name="employment" type="radio" component={RadioComp} />
                {/* <Field name="employed" component="input" type="checkbox" /> */}
              </div>
              <div>
                <Field
                  name="favCol"
                  label="Fav Col"
                  type="select"
                  placeholder="Fav Col"
                  component={SelectComp}
                  options={["red", "green", "blue", "yellow"]}
                />
                {/* </div> */}
                {/* <div> */}
                <Field
                  name="toppings"
                  label="Toppings"
                  type="select"
                  placeholder="toppings"
                  component={SelectComp}
                  options={[
                    "chicken",
                    "ham",
                    "mushrooms",
                    "cheese",
                    "tuna",
                    "pineapple",
                  ]}
                />
              </div>

              <div>
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
              {/* </form> */}
            </div>
          </Box>
        )}
      />
    </Container>
  );
};

export default AddRecord;
