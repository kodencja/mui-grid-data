import React, { useContext } from "react";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@mui/styles";
import { Container, Box, Button, Stack } from "@mui/material";
import { ConstsContext } from "../../App";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextFieldComp from "../../components/FormComps/TextFieldComp";
import SelectComp from "../../components/FormComps/SelectComp";
import { format, parseISO, formatISO } from "date-fns";
import DateComp from "../../components/FormComps/DateComp";
import { escapeHTMLentitiesForNaN } from "../../functions/validation/escapeHTMLent";
import { validateFromAddForm } from "../../functions/validation/validation";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const AddRecord = ({ api_post, baseURLtoDB, loading }) => {
const AddRecord = ({ apiPropsPost }) => {
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

  const { api_post, baseURLtoDB, loading } = apiPropsPost;

  let formData = {
    discount: 0,
    vat: 0,
    unit: "kg",
    // use_by_date: format(new Date().setDate(new Date().getDate()), "Y-MM-dd"),
    use_by_date: format(new Date(), "Y-MM-dd"),
    // use_by_date: format(new Date(), "dd.MM.Y"),
  };

  const handleOnSubmit = async (values) => {
    const dataSubmit = { ...values };
    console.log(values);

    // escape from '0' as string to '0' as a number
    if (!dataSubmit.discount || dataSubmit.discount === "0") {
      dataSubmit.discount = 0;
    }
    if (!dataSubmit.price_netto || dataSubmit.price_netto === "0") {
      dataSubmit.price_netto = 0;
    }
    console.log("dataSubmit");
    console.log(dataSubmit);

    const dataNoHTML = await escapeHTMLentitiesForNaN(dataSubmit);
    console.log("dataNoHTML");
    console.log(dataNoHTML);
    // await api_post(baseURLtoDB, dataSubmit);
    // await sleep(800);
    window.alert(JSON.stringify(dataSubmit, 0, 2));
  };

  const checkInt = (val) => {
    if (!val || Number(val === 0)) {
      // console.log("!val Int");
      return Number(val);
    } else if (isNaN(val) || !val) {
      val = 0;
    } else {
      return parseInt(val);
    }
  };

  const checkFloat = (val) => {
    if (!val || val === "0") {
      // console.log("!val Float");
      return val;
    } else {
      return parseFloat(val);
    }
  };

  const dateFormating = (val) => {
    if (val) {
      return format(new Date(val), "Y-MM-dd");
    }
  };

  return (
    <Container>
      <div className={classes.title}>Add product to database</div>
      <Form
        onSubmit={handleOnSubmit}
        initialValues={{
          ...formData,
        }}
        validate={validateFromAddForm}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <Box component="form" onSubmit={handleSubmit}>
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
                  onClick={form.reset}
                  disabled={submitting || pristine}
                  color="secondary"
                >
                  Reset
                </Button>
              </Stack>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </div>
          </Box>
        )}
      />
    </Container>
  );
};

export default AddRecord;
