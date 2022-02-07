import React, { useContext, useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@mui/styles";
import { Container, Box, Button, Stack, Typography } from "@mui/material";
import { ConstsContext } from "../../App";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextFieldComp from "../smallComponents/forForm/TextFieldComp";
import SelectComp from "../smallComponents/forForm/SelectComp";
import { useSearchParams } from "react-router-dom";
import DateComp from "../smallComponents/forForm/DateComp";
import { format } from "date-fns";
import { validateFromAddForm } from "../../functions/validation/validation";
import { onSubmit } from "../../functions/forInputs/formSubmit";
import {
  checkFloat,
  checkInt,
  dateFormating,
} from "../../functions/formatParse/formatParse";

const AddRecord = ({ apiPropsPost }) => {
  // const AddRecord = (props) => {
  const constsContext = useContext(ConstsContext);

  const { list_of_countries, currencies, units, vat, qualities } =
    constsContext;

  const matches = useMediaQuery("(min-width: 750px)");
  const useStyles = makeStyles({
    marginV: {
      marginTop: "10px",
      marginBottom: "10px",
    },
    center: {
      textAlign: "center",
      justifyContent: "center",
    },
    rowBreak: {
      flexBasis: "100%",
      height: "0",
      display: matches ? "flex" : "none",
    },
    break: {
      flexBasis: "100%",
      height: "0",
    },
    rowFlex: {
      // display: matches ? "flex" : "block",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    title: {
      fontSize: "22px",
    },
  });

  const classes = useStyles();

  const { api_post, baseURLtoDB, loading, responseTxt, apiResponseTxt, error } =
    apiPropsPost;

  useEffect(() => {
    apiResponseTxt("");
  }, []);

  let formData = {
    discount: 0,
    vat: 0,
    unit: "kg",
    use_by_date: format(new Date(), "Y-MM-dd"),
  };

  const resetAll = (restart) => {
    console.log("restart");
    if (!error) {
      console.log("restart since no error");
      restart();
      // setTimeout(() => {
      //   apiResponseTxt("");
      // }, 3000);
    }
  };

  return (
    <Container>
      <div className={classes.title}>Add product to database</div>
      <Form
        onSubmit={(values) => onSubmit(values, api_post, baseURLtoDB)}
        initialValues={{
          ...formData,
        }}
        validate={validateFromAddForm}
        render={({
          handleSubmit,
          form: { reset, restart, getState },
          submitting,
          pristine,
          submitFailed,
          submitSucceeded,
          errors,
          hasValidationErrors,
          hasSubmitErrors,
          dirty,
          dirtyFields,
          dirtySinceLastSubmit,
          dirtyFieldsSinceLastSubmit,
        }) => (
          <Box
            component="form"
            onSubmit={async (event) => {
              await handleSubmit(event);
              console.log("submitSucceeded");
              console.log(submitSucceeded);
              !hasSubmitErrors
                ? resetAll(restart)
                : console.log("Submit failed!");
            }}
          >
            <div>
              <div className={classes.rowFlex}>
                <Field
                  name="name"
                  type="text"
                  label="Product name"
                  placeholder="Product name"
                  required
                  component={TextFieldComp}
                />
                <Field
                  name="price_netto"
                  type="number"
                  step={0.1}
                  label="Price netto"
                  placeholder="Price netto"
                  required
                  component={TextFieldComp}
                  parse={checkFloat}
                />
                <Field
                  name="discount"
                  type="number"
                  label="Discount"
                  defaultValue={formData.discount}
                  sign="%"
                  component={TextFieldComp}
                  parse={checkInt}
                />
                <div className={classes.break}></div>
                <Field
                  name="producer"
                  type="text"
                  label="Producer"
                  placeholder="Producer"
                  component={TextFieldComp}
                />
                <Field
                  name="email_contact"
                  type="email"
                  label="Email contact"
                  placeholder="Email contact"
                  component={TextFieldComp}
                />
              </div>
              <div className={`${classes.rowBreak} ${classes.marginV}`}></div>
              <Field
                name="origin"
                type="text"
                label="Origin"
                placeholder="Origin"
                component={SelectComp}
                options={list_of_countries}
              />
              <Field
                name="use_by_date"
                type="date"
                label="Use by date"
                initialValue={formData.use_by_date}
                required
                component={DateComp}
                min={new Date()}
                parse={dateFormating}
              />
              <Field
                name="vat"
                type="select"
                label="VAT"
                sign="%"
                placeholder="VAT"
                component={SelectComp}
                // options={[0, 5, 8, 23]}
                options={vat.map((n) => parseInt(n * 100))}
                defaultValue={formData.vat}
                parse={checkFloat}
              />
              <Field
                name="currency"
                type="select"
                label="Currency"
                placeholder="Currency"
                component={SelectComp}
                options={currencies}
                required
              />
              <Field
                name="unit"
                type="select"
                label="Unit"
                placeholder="Unit"
                component={SelectComp}
                options={units}
                defaultValue={formData.unit}
                required
              />
              <Field
                name="quality"
                type="select"
                label="Quality"
                placeholder="Quality"
                component={SelectComp}
                options={qualities}
                required
              />
              <div className={classes.break}></div>
              <Stack
                spacing={2}
                direction="row"
                className={classes.marginV + " " + classes.center}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting || pristine}
                >
                  {loading ? "Submitting" : "Submit"}
                </Button>
                <Button
                  variant="contained"
                  onClick={restart}
                  disabled={submitting || pristine}
                  color="secondary"
                >
                  Reset
                </Button>
              </Stack>
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  my: 2,
                  color: responseTxt ? "success.dark" : "text.primary",
                }}
              >
                {submitSucceeded && pristine ? responseTxt : "Nic"}
              </Typography>
              <pre>
                submitSucceeded: {JSON.stringify(submitSucceeded, 0, 2)}
              </pre>
              <pre>submitFailed: {JSON.stringify(submitFailed, 0, 2)}</pre>
              <pre>pristine: {JSON.stringify(pristine, 0, 2)}</pre>
              <pre>
                hasValidationErrors: {JSON.stringify(hasValidationErrors, 0, 2)}
              </pre>
              <pre>
                hasSubmitErrors: {JSON.stringify(hasSubmitErrors, 0, 2)}
              </pre>
              <pre>dirty: {JSON.stringify(dirty, 0, 2)}</pre>
              <pre>
                dirtySinceLastSubmit:{" "}
                {JSON.stringify(dirtySinceLastSubmit, 0, 2)}
              </pre>
              <pre>
                dirtyFieldsSinceLastSubmit:{" "}
                {JSON.stringify(dirtyFieldsSinceLastSubmit, 0, 2)}
              </pre>
              <pre>Error: {JSON.stringify(error, 0, 2)}</pre>
              <pre>dirtyFields: {JSON.stringify(dirtyFields, 0, 2)}</pre>
              <pre>Errors: {JSON.stringify(errors, 0, 2)}</pre>
            </div>
          </Box>
        )}
      />
    </Container>
  );
};

export default AddRecord;

// onSubmit={async event => {
//   await handleSubmit(event)
//   form.reset()
// }}
