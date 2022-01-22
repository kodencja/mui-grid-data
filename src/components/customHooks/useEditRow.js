import React, {useState, useRef, useEffect} from 'react';
import {
    final_text_resp,
    api_method,
    current_url,
    post_data,
    current_record_id
  } from "../../reducer/types";
  import {list_of_countries} from '../../constants/countries';
  import {currencies, units, discounts, vat, qualities} from '../../constants/array_in_columns';
  import usePostPut from './usePostPut';
import useFetch from './useFetch1';


// const useEditRow = (dispatch, baseURLtoDB) => {
const useEditRow = (dispatch, baseURLtoDB, currentURLtoDB, apiMethod) => {
    const [editRowsModel, setEditRowsModel] = useState({});
  // store row data after editing
  const [editRowData, setEditRowData] = useState({});
  const [error, setError] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const post_id = useRef();
  const prev_val = useRef();
  const prev_id = useRef();
  const useFetchOptions = {baseURLtoDB, currentURLtoDB, apiMethod, postData: editRowData, dispatch};
  // const { api_put, error_msg, loading, anyError } = usePostPut();
  const {putData} = useFetch(useFetchOptions);

  // useEffect(() => {
  //   console.log("post_id.current");
  //   console.log(post_id.current);
  //   if(post_id.current !== undefined){
  //     dispatch({ type: current_url, payload: `${baseURLtoDB}/${post_id}` });
  //   }
  // }, [post_data])

//   useEffect(() => {
// console.log("editRowData:");
// console.log(editRowData);
//   }, [editRowData])

  // useEffect(()=>{
  //   let isMounted = true;
  //   if(isMounted && apiMethod !== "PUT" && currentURLtoDB !== baseURLtoDB){
  //     // console.log("Change postData in useEditRow");
  //     // dispatch({ type: post_data, payload: editRowData });
  //     // setIsDataChanged(true);
  //     console.log("Change api_method in useEditRow to PUT");
  //     dispatch({ type: api_method, payload: "PUT" });
  //   }
  //   // dispatch({ type: api_method, payload: "PUT" });
  //   return () => {
  //     isMounted = false;
  //   }
  // }, [currentURLtoDB])

  // useEffect(()=>{
  //   if(currentURLtoDB !== baseURLtoDB && isDataChanged){
  //     console.log("Change api_method in useEditRow to PUT");
  //     dispatch({ type: api_method, payload: "PUT" });
  //     setIsDataChanged(false);
  //   }
  // }, [isDataChanged])

  const handleEditRowsModelChange = (model) => {
    post_id.current = undefined;
    // console.log("handleEditRowsModelChange");
    // console.log("model");
    // console.log(model); 
    // model:  {5: brutto: {value: 109.47}, id: 5, name: {value: 'Broom'}, netto: {value: 95}, origin: {value: 'Sweden'}, useByDate: {value: '2021-10-30'} }
    // row: {id: 5, name: 'Broom', netto: 92, brutto: 109.47, origin: 'Sweden', …}
    const editedIds = Object.keys(model); // 5
    const rowObj = model[editedIds[0]];
    const modelChecked = {...model};
    if(prev_id.current === undefined){
      prev_id.current = editedIds[0];
    }
    console.log("modelChecked:");
    console.log(modelChecked);
console.log(editedIds[0]);
console.log(editedIds.length);
console.log(rowObj);
console.log(prev_id.current);
// console.log(rowObj.discount);

    const isTwoDaysAhead = (date) => {
    const today = new Date();
const tomorrow = new Date(today);
// console.log(tomorrow.valueOf());
tomorrow.setDate(tomorrow.getDate() + 1);
// console.log(today.valueOf());
// console.log(tomorrow.valueOf());
// console.log(tomorrow);
// console.log(date.valueOf());
// console.log(date);

      // console.log(new Date(date).valueOf());

      // const dayForward = new Date().setDate(new Date().getDate() + 1);
      // const dayForward = new Date().setDate(new Date().getDay() + 1);
      // console.log(new Date().setDate(new Date().getDate() + 1));
      // console.log(dayForward);
      // console.log(isNaN(new Date(date).valueOf()));
      if(isNaN(new Date(date).valueOf())) return true;
      // else return new Date(date).valueOf() < monthForward.valueOf();
      // else return new Date(date).valueOf() < dayForward.valueOf();
      // else return date.valueOf() < dayForward.valueOf();
      else return date.valueOf() < tomorrow.valueOf();
    }

    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const reg = 
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log('validateEmail:');
        const reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var rege = /\S+@\S+\.\S+/;
        console.log(reg.test(String(email).toLowerCase()));
      return reg.test(String(email).toLowerCase());
      // return reg_email.test(email);
      // return rege.test(email);
      // return rege.test(String(email));
    }
   
    // console.log(editedIds);
    const getUpdatedRowObj = () => {
      // console.log('rowObj_1');
      // console.log(rowObj);
      const rowUpdated = {};
      // for (const [key, val] of Object.entries(model[editedIds[0]])) {
      for (const [key, val] of Object.entries(rowObj)) {
        rowUpdated[key] = val.value;
      }
      console.log('rowUpdated');
      console.log(rowUpdated);
      return rowUpdated;
    };

    // parse discount value to change 1/100 step of its value instead of default change 1.0
    // if(rowObj && rowObj.discount){
    //   // rowObj.discount.value = rowObj.discount.value * 100;
    //   // rowObj.discount.value = parseFloat(rowObj.discount.value / 100).toFixed(2);
    //   const val_discount = Number(rowObj.discount.value);
    //   // console.log(val_discount);
    //   if(prev_val.current === undefined || prev_id.current !== editedIds[0]){
    //     prev_val.current = val_discount;
    //     prev_id.current = editedIds[0];
    //     // console.log(prev_val.current);
    //   }
    //   if(val_discount > prev_val.current){
    //     // prev_val.current = ((val_discount - prev_val.current) / 100) + prev_val.current;
    //     prev_val.current = prev_val.current + 0.01;
    //     // console.log(prev_val.current);
    //     rowObj.discount.value = parseFloat(prev_val.current).toFixed(2);
    //     // prev_val.current = undefined;
    //   } 
    //   else if(val_discount < prev_val.current) {
    //     // prev_val.current = ((prev_val.current - val_discount) / 100) + prev_val.current;
    //     prev_val.current = prev_val.current - 0.01;
    //     // console.log(prev_val.current);
    //     rowObj.discount.value = parseFloat(prev_val.current).toFixed(2);
    //     // prev_val.current = undefined;
    //   }
    //   // rowObj.discount = {...rowObj.discount, value: parseFloat(rowObj.discount.value/ 100).toFixed(2)};
    //   // rowObj.discount.value = (parseInt(rowObj.discount.value) / 100);
    //   // rowObj.discount.value = (Number(rowObj.discount.value) / 100).toFixed(2);
    //   // rowObj.discount.value = parseFloat(rowObj.discount.value/ 100).toFixed(2);
    //   // console.log(Number(rowObj.discount.value));
    //   modelChecked[editedIds[0]] = rowObj;
    // }

    // user stops editing when the edit model is empty
    // if (editedIds.length === 0) {
    //   // alert(JSON.stringify(editRowData, null, 4));
    //   // console.log(editRowData);
    //   console.log("editedIds.length === 0");
    //   // setEditRowsModel(modelChecked);
    //   // update on firebase
    // } else 
    if (editedIds.length > 0) {
      // setEditRowData({ id: editedIds[0], ...model[editedIds[0]] });
      // setEditRowData({ ...editRowData, ...model[editedIds[0]] });
      setError(false);
      // TUTAJ ROBIMY VALIDATION
      // if (model[editedIds[0]].name.value.length < 3) {
        // typeof rowObj.name.value === 'string' || rowObj.name.value instanceof String
      if (!rowObj.name.value || !typeof rowObj.name.value === 'string' || rowObj.name.value.length < 4 || rowObj.name.value.length > 40) {
        console.log("Too SHORT or too LONG");
        rowObj.name = {...rowObj.name, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
        // return;
        // return false;
        // setEditRowData({});
        // setEditRowData({ id: Number(editedIds[0]), ...getUpdatedRowObj() });
      } 
      if(!rowObj.price_netto.value || isNaN(rowObj.price_netto.value) || rowObj.price_netto.value < 1 || rowObj.price_netto.value > 1000000){
        rowObj.price_netto = {...rowObj.price_netto, error: true };
        // rowObj = {...rowObj, price_netto: {...value,} };
        // console.log('rowObj_2');
        // console.log(rowObj);
        modelChecked[editedIds[0]] = rowObj;
        // console.log('modelChecked');
        // console.log(modelChecked);
        // return;
        setError(true);
      } 
      if(!rowObj.discount.value || isNaN(rowObj.discount.value) || rowObj.discount.value < 0 || rowObj.discount.value > 100){
        rowObj.discount = {...rowObj.discount, error: true };
        // rowObj = {...rowObj, price_netto: {...value,} };
        // console.log('rowObj_2');
        // console.log(rowObj);
        modelChecked[editedIds[0]] = rowObj;
        // console.log('modelChecked');
        // console.log(modelChecked);
        // return;
        setError(true);
      } 
      if(!rowObj.use_by_date.value || isTwoDaysAhead(rowObj.use_by_date.value)){
        rowObj.use_by_date = {...rowObj.use_by_date, error: true };
        // rowObj = {...rowObj, price_netto: {...value,} };
        // console.log('rowObj_2');
        // console.log(rowObj);
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
        // console.log('modelChecked');
        // console.log(modelChecked);
        // return;
      } 
      if (!rowObj.origin.value || !typeof rowObj.origin.value === 'string' || rowObj.origin.value.length < 3 || rowObj.origin.value.length > 40 || !list_of_countries.some( el => el === rowObj.origin.value)) {
        console.log("Too SHORT or too LONG");
        rowObj.origin = {...rowObj.origin, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
      } 
      if (!rowObj.producer.value || !typeof rowObj.producer.value === 'string' || rowObj.producer.value.length < 3 || rowObj.producer.value.length > 40) {
        console.log("Too SHORT or too LONG");
        rowObj.producer = {...rowObj.producer, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
      } 
      if (!rowObj.currency.value || !typeof rowObj.currency.value === 'string' || rowObj.currency.value.length !== 3) {
        console.log("Too SHORT or too LONG");
        rowObj.currency = {...rowObj.currency, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
      } 
      if (!rowObj.unit.value || !typeof rowObj.unit.value === 'string' || !units.some( el => el === rowObj.unit.value) ) {
        console.log("Too SHORT or too LONG");
        rowObj.unit = {...rowObj.unit, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
      } 
      if (!rowObj.quality.value || !typeof rowObj.quality.value === 'string' || !qualities.some( el => el === rowObj.quality.value) ) {
        console.log("Too SHORT or too LONG");
        rowObj.quality = {...rowObj.quality, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
      } 
      if (!validateEmail(rowObj.email_contact.value) ) {
        console.log("Wrong email address");
        rowObj.email_contact = {...rowObj.email_contact, error: true };
        modelChecked[editedIds[0]] = rowObj;
        setError(true);
      } 
      if(!error) {
        console.log("OKAY");
        setEditRowData({ id: Number(editedIds[0]), ...getUpdatedRowObj() });

      } 
      // else {
        // prev_val.current = undefined;
        // prev_id.current = undefined;
      // }
      // setEditRowData({ id: Number(editedIds[0]), ...getUpdatedRowObj() });
      
    }
    // setEditRowsModel(rowObj);
    setEditRowsModel(modelChecked);
    // setEditRowsModel(model);
    // console.log("model");
    // console.log(model);
    // console.log("editRowData");
    // console.log(editRowData);
  };
  //   [editRowData]
  // );

  const editRowCommit = (id) => {
    console.log("EDIT_ROW_COMMIT: ");
    console.log(id); // id number
    post_id.current = id;
    // console.log(editRowsModel);
    // console.log(editRowData);
    // TUTAJ ROBIMY ROW UPDATE - trzeba pobrać dany row i zmienić currentURLtoDB na typu update
    // dispatch({ type: post_data, payload: editRowData });
    // dispatch({ type: api_method, payload: "PUT" });
    // dispatch({ type: current_url, payload: `${baseURLtoDB}/${id}` });
    // dispatch({ type: current_record_id, payload: id });
    // api_put(`${baseURLtoDB}/${id}`, editRowData);
    putData(`${baseURLtoDB}/${id}`, editRowData);
  };
return {editRowsModel, editRowCommit, handleEditRowsModelChange}
}

export default useEditRow
