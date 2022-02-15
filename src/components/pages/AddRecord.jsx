import React, { useContext, useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";
import PropTypes from "prop-types";
import { Container, Box, Button, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ConstsContext, ActionsContext } from "../../App";
import useSomeStyles from "../../styles/useSomeStyles";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextFieldComp from "../smallComponents/forForm/TextFieldComp";
import SelectComp from "../smallComponents/forForm/SelectComp";
import DateComp from "../smallComponents/forForm/DateComp";
import CircularProgress from "@mui/material/CircularProgress";
import { validate } from "../../functions/validation/validation";
import { onSubmit } from "../../functions/forInputs/formSubmit";
import { clearResponsetxt } from "../../functions/forInputs/forResponseTxt";
import {
  checkFloat,
  checkInt,
  dateFormating,
} from "../../functions/formatParse/formatParse";
import { list_of_countries } from "../../constsNotInStore/countries";
import { addProduct } from "../../constsNotInStore/titles";

const AddRecord = ({ apiPropsPost }) => {
  // const AddRecord = (props) => {
  const constsContext = useContext(ConstsContext);
  const actsContext = useContext(ActionsContext);

  const { setMainTitle } = actsContext;

  const { currencies, units, vat, qualities, formInitData } = constsContext;

  const { useStylesForm } = useSomeStyles("(min-width: 750px)");

  const classes = useStylesForm();

  const { api_post, baseURLtoDB, loading, responseTxt, apiResponseTxt, error } =
    apiPropsPost;

  const formRef = useRef();

  useEffect(() => {
    apiResponseTxt("");
    setMainTitle(addProduct);
  }, []);

  useEffect(() => {
    // console.log("error-1");
    // console.log(error);

    if (!error && responseTxt) {
      console.log("RESTART");
      formRef.current.restart();
      setTimeout(() => {
        clearResponsetxt(apiResponseTxt);
      }, 5000);
    }
  }, [error, responseTxt]);

  return (
    <Container>
      {/* <div className={classes.title}>Add product to database</div> */}
      <Form
        onSubmit={(values) => onSubmit(values, api_post, baseURLtoDB)}
        initialValues={{
          ...formInitData,
        }}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          formRef.current = form;
          return (
            <Box
              component="form"
              onSubmit={async (event) => {
                await handleSubmit(event);
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
                    defaultValue={formInitData.discount}
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
                  initialValue={formInitData.use_by_date}
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
                  defaultValue={formInitData.vat}
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
                  defaultValue={formInitData.unit}
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
                    endIcon={<SendIcon />}
                    disabled={submitting || pristine}
                  >
                    {loading ? "Submitting" : "Submit"}
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<RestartAltIcon />}
                    onClick={form.restart}
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
                  {loading ? (
                    <CircularProgress />
                  ) : !loading ? (
                    error ? (
                      error
                    ) : !error && pristine ? (
                      responseTxt
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </Typography>
              </div>
            </Box>
          );
        }}
      />
    </Container>
  );
};

AddRecord.propTypes = {
  apiPropsPost: PropTypes.shape({
    api_post: PropTypes.func.isRequired,
    baseURLtoDB: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    responseTxt: PropTypes.string,
    apiResponseTxt: PropTypes.func,
    error: PropTypes.string,
  }),
};

export default AddRecord;
