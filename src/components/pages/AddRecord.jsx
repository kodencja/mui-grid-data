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
import TextFieldComp from "../../components/FormComps/TextFieldComp";
// import RadioComp from "../../components/FormComps/RadioComp";
import SelectComp from "../../components/FormComps/SelectComp";
import { format, parseISO, formatISO } from "date-fns";
import DateComp from "../../components/FormComps/DateComp";
import { validate } from "../../functions/validation";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  title: {
    fontSize: "22px",
  },
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const AddRecord = ({ api_post, baseURLtoDB, loading }) => {
const AddRecord = ({ apiPropsPost }) => {
  const classes = useStyles();

  const { api_post, baseURLtoDB, loading } = apiPropsPost;

  let formData = {
    discount: 0,
    vat: 0,
    unit: "kg",
    use_by_date: format(
      new Date().setDate(new Date().getDate() + 1),
      "Y-MM-dd"
    ),
    // use_by_date: format(new Date(), "Y-MM-dd"),
    // use_by_date: format(new Date(), "dd.MM.Y"),
    // stooge: "larry",
    // toppings: [],
    // sauces: [],
    // employment: "unemployed",
    // favCol: "",
  };

  const handleOnSubmit = async (values) => {
    const dataSubmit = { ...values };
    console.log(values);
    dataSubmit.discount = parseFloat(dataSubmit.discount);
    // dataSubmit.discount = parseFloat(dataSubmit.discount) / 100;
    // dataSubmit.price_netto = parseFloat(dataSubmit.price_netto);
    // dataSubmit.vat = parseFloat(dataSubmit.vat);
    console.log(dataSubmit);
    await api_post(baseURLtoDB, dataSubmit);
    // await sleep(800);
    window.alert(JSON.stringify(dataSubmit, 0, 2));
  };

  // const validate = (values) => {
  //   const errors = {};
  //   // console.log(formData);
  //   // console.log("VALUES: ");
  //   // console.log(values);
  //   // console.log(values.favCol);
  //   // console.log(Number(values.use_by_date));
  //   // console.log(values.employed);
  //   // console.log(values.unemployed);
  //   if (!values.name) {
  //     errors.name = "This field is required";
  //   }
  //   if (!values.price_netto) {
  //     errors.price_netto = "This field is required";
  //   }
  //   if (values.vat !== 0 && !values.vat) {
  //     errors.vat = "This field is required";
  //   }
  //   if (!values.currency) {
  //     errors.currency = "This field is required";
  //   }
  //   // if (!values.use_by_date || isNaN(values.use_by_date)) {
  //   // if (!values.use_by_date || Number(values.use_by_date)) {
  //   if (!values.use_by_date) {
  //     console.log(values.use_by_date);
  //     errors.use_by_date = "This field is required";
  //   }
  //   // if (values.employment === undefined || !values.employment) {
  //   //   errors.employment = "Required";
  //   // }
  //   return errors;
  // };

  const converseDiscount = (val) => {
    // if (val) return `${Number(val)}%`;
    console.log(val);
    // if (val === "top") return "T";
    // else if (val === "medium") return "M";
    // else if (val === "low") return "L";
    // else return val;
    // return Number(val) / 10;
    // return parseFloat(val / 100);
    return val / 100;
    // return Number(Number(val) / 10);
    // return val / 10;
    // if (!val || val === "0") {
    //   return val;
    // } else {
    //   return Number(val) * 10;
    // }

    // return parseFloat((Number(val) / 100).toFixed(2));
  };

  const checkFloat = (val, prevVal) => {
    // console.log(val);
    // console.log(isNaN(val));
    // console.log(prevVal);
    // console.log(isNaN(prevVal));
    // if (!prevVal || prevVal === "0") {
    // if (val && isNaN(prevVal)) {
    //   return val;
    // } else {
    //   console.log("ELSE");
    //   // return parseFloat(val * 100);
    //   return prevVal + val * 100;
    // }
    // return val;
    // return val / 100;
    if (!isNaN(val)) {
      return parseFloat(val);
    } else return val;
  };

  const dateFormating = (val) => {
    return format(new Date(val), "Y-MM-dd");
  };

  const checkInteger = (val) => {
    // console.log("val: ", val);
    if (!val || val === "0") {
      return val;
    } else {
      return Number(val);
    }
  };

  return (
    <Container>
      <div className={classes.title}>Add product to database</div>
      <a
        href="https://final-form.org/react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Docs
      </a>
      <Form
        onSubmit={handleOnSubmit}
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
              <div>
                <Field
                  name="name"
                  type="text"
                  label="Product name"
                  placeholder="Product name"
                  required
                  component={TextFieldComp}
                  // style={{ padding: 10 }}
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
                  // type="text"
                  label="Discount"
                  defaultValue={formData.discount}
                  // pattern={"[0-9]*"}
                  // inputMode="numeric"
                  // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  // min={1}
                  // max={99}
                  // step={0.01}
                  sign="%"
                  // placeholder="Discount"
                  component={TextFieldComp}
                  // parse={checkFloat}
                  // format={checkFloat}
                  // data={checkFloat}
                  // parse={converseDiscount}
                  // format={converseDiscount}
                />
              </div>
              <div>
                <Field
                  name="origin"
                  type="text"
                  label="Country of origin"
                  placeholder="Country of origin"
                  component={TextFieldComp}
                />
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
                <Field
                  name="use_by_date"
                  type="date"
                  label="Use by date"
                  // defaultValue={"2002-02-03"}
                  initialValue={formData.use_by_date}
                  // subscription={{ touched: true }}
                  // defaultValue={new Date()}
                  // value={new Date()}
                  // value={new Date().setDate(new Date().getDay() + 1)}
                  // error={true}
                  // value={formData.date.setMonth(formData.date.getMonth() + 1)}
                  // value={formData.date.setMonth(+3)}
                  // value={new Date().setMonth(new Date().getMonth() + 2)}
                  required
                  component={DateComp}
                  // defaultValue={formData.use_by_date}
                  // min={new Date()}
                  parse={dateFormating}
                />
                {/* </Field> */}
                {/* <Field
                  name="use_by_date"
                  type="date"
                  label="Use by date"
                  required
                  component={TextFieldComp}
                  // defaultValue={formData.use_by_date}
                  // min={new Date()}
                /> */}
              </div>
              <div>
                <Field
                  name="vat"
                  type="select"
                  label="VAT"
                  sign="%"
                  placeholder="VAT"
                  component={SelectComp}
                  options={[0, 5, 8, 23]}
                  defaultValue={formData.vat}
                  // parse={checkFloat}
                />
                <Field
                  name="currency"
                  type="select"
                  label="Currency"
                  placeholder="Currency"
                  component={SelectComp}
                  options={["EUR", "USD", "GBP", "PLN", "CNY"]}
                  required
                />
                <Field
                  name="unit"
                  type="select"
                  label="Unit"
                  placeholder="Unit"
                  component={SelectComp}
                  options={["kg", "box", "bag", "piece"]}
                  defaultValue={formData.unit}
                  required
                />
                <Field
                  name="quality"
                  type="select"
                  label="Quality"
                  placeholder="Quality"
                  component={SelectComp}
                  options={["Top", "Medium", "Low"]}
                  required
                  // parse={converseQuality}
                />
              </div>
              <div>
                <button type="submit" disabled={submitting || pristine}>
                  {loading ? "Submitting" : "Submit"}
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

/* {({ input, meta }) => (
<div>
<DateComp {...input} {...meta} />
{meta.error && meta.touched && <span>{meta.error}</span>}
</div>
)} */
