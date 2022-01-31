import React, { useState, useRef, useEffect } from "react";
import { format, parseISO, formatISO } from "date-fns";
import { validate } from "../../functions/validation/validation";
import { escapeHTMLentities } from "../../functions/validation/escapeHTMLent";

const useEditRow = (api_put, baseURLtoDB) => {
  // const isMountedRef = useRef(true);
  // const useEditRow = (dispatch, baseURLtoDB, currentURLtoDB, apiMethod) => {
  const [editRowsModel, setEditRowsModel] = useState({});
  // store row data after editing
  const [editRowData, setEditRowData] = useState({});
  const [error, setError] = useState(false);

  const getUpdatedRowObj = (rowObj) => {
    // console.log('rowObj_1');
    // console.log(rowObj);
    const rowUpdated = {};
    // for (const [key, val] of Object.entries(model[editedIds[0]])) {
    for (const [key, val] of Object.entries(rowObj)) {
      rowUpdated[key] = val.value;
    }
    // console.log("rowUpdated");
    // console.log(rowUpdated);
    return rowUpdated;
  };

  const getFlatRowObj = (rowObj) => {
    const rowObjCopy = {};
    return new Promise((res, rej) => {
      for (let prop in rowObj) {
        rowObjCopy[prop] = rowObj[prop].value;
        // console.log(rowObjCopy);
      }
      res(rowObjCopy);
    });
  };

  const markErrorInRowObj = (errorsObj, rowObj) => {
    const errorsObjLength = Object.keys(errorsObj).length;
    let n = 0;
    return new Promise((resolve, reject) => {
      for (let prop in errorsObj) {
        if (errorsObj[prop] !== undefined) {
          rowObj[prop] = {...rowObj[prop], error: true };
        setError(true);
        }
        n++;
        if(n === errorsObjLength){
          // console.log(errorsObjLength);
          // console.log(n);
          resolve(rowObj);
        }
      }
      // console.log(errorsObjCopy);
    });
  };

  const handleEditRowsModelChange = async (model) => {
    // post_id.current = undefined;
    // console.log("handleEditRowsModelChange");
    // console.log("model");
    // console.log(model);
    // model:  {5: brutto: {value: 109.47}, id: 5, name: {value: 'Broom'}, netto: {value: 95}, origin: {value: 'Sweden'}, useByDate: {value: '2021-10-30'} }
    // row: {id: 5, name: 'Broom', netto: 92, brutto: 109.47, origin: 'Sweden', …}
    const editedIds = Object.keys(model); // 5
    const rowObj = model[editedIds[0]];
    const modelChecked = { ...model };
    // if (prev_id.current === undefined) {
    //   prev_id.current = editedIds[0];
    // }

    const flatRowObj = await getFlatRowObj(rowObj);

    // console.log("flatRowObj");
    // console.log(flatRowObj); // {currency: "EUR", discount: 25, email_contact: "rtidey0@bigcartel.com", name: "Puree - Blackcurrant", origin: "United Kingdom", price_netto: 263.49, producer: "Langworth, Grady and Anderson", quality: "M",     unit: "box", use_by_date: "2022-03-07", vat: 0}

    // console.log("modelChecked1:");
    // console.log(modelChecked);
    // console.log(editedIds[0]);
    // console.log(editedIds.length);
    // console.log("rowObj 1");
    // console.log(rowObj);

    // console.log(editedIds);

    if (editedIds.length > 0) {
      // setEditRowData({ id: editedIds[0], ...model[editedIds[0]] });
      // setEditRowData({ ...editRowData, ...model[editedIds[0]] });
      setError(false);
      // TUTAJ ROBIMY VALIDATION

      const errors = validate(flatRowObj, true);
      // console.log("errors in flatRowObj");
      // console.log(errors); // {name: 'This field must contain between 2 and 50 chars', price_netto: undefined, discount: undefined, vat: undefined, currency: undefined, …}
      // console.log(Object.keys(errors).length);

      // const rowObjWithErrors = await markErrorInRowObj(errors, rowObj);
      await markErrorInRowObj(errors, rowObj); 
      // {name: {error: true}, producer: {error: true}}
      // console.log(isAnyError); // {name: {error: true}, producer: {error: true}}

      // console.log("rowObj 2");
      // console.log(rowObj);

      if (!error) {
        console.log("OKAY");
        setEditRowData({
          id: Number(editedIds[0]),
          ...getUpdatedRowObj(rowObj),
        });
      }
    }

    // console.log("error3");
    // console.log(error);
    // console.log("modelChecked2:");
    // console.log(modelChecked);  // {1: {name: {…}, price_netto: {…}, discount: {…}, vat: {…}, currency: {…}, …}}
    setEditRowsModel(modelChecked);
  };


  const editRowCommit = async (id) => {
    console.log("EDIT_ROW_COMMIT: ");
    // console.log(id); // id number
    // post_id.current = id;
    // console.log(editRowsModel);
    // console.log("editRowData 1:");
    // console.log(editRowData);
    editRowData.use_by_date = format(
      new Date(editRowData.use_by_date),
      "Y-MM-dd"
    );
    // console.log("editRowData 2:");
    // console.log(editRowData);
    const editRowDataNoHTML = await escapeHTMLentities(editRowData);
    // TUTAJ ROBIMY ROW UPDATE - trzeba pobrać dany row i zmienić currentURLtoDB na typu update
    // console.log("Call api_put in editRowCommit 1");
    await api_put(`${baseURLtoDB}/${id}`, editRowDataNoHTML);
    // console.log("Call api_put in editRowCommit 2");
  };
  return { editRowsModel, editRowCommit, handleEditRowsModelChange };
};

export default useEditRow;
