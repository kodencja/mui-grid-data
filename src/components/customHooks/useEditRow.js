import { useState, useRef } from "react";
import { validate } from "../../functions/validation/validation";
import { escapeHTMLentitiesForNaN } from "../../functions/validation/escapeHTMLent";
import {
  getFlatRowObj,
  getUpdatedRowObj,
  markErrorInRowObj,
} from "../../functions/actionFns/editRowFns";
import { dateFormating } from "../../functions/formatParse/formatParse";

const useEditRow = (api_put, baseURLtoDB) => {
  const [editRowsModel, setEditRowsModel] = useState({});

  // save row data after editing
  const [editRowData, setEditRowData] = useState({});
  const error = useRef(false);

  const handleEditRowsModelChange = async (model) => {
    const editingRowId = Object.keys(model); // e.g. 1 or 5

console.log("model");
console.log(model);

    const rowObj = model[editingRowId[0]];
    for (let prop in model[editingRowId[0]]) {           
// null, undefined, false, 0, ''

     // najpierw zamienic wszystkie undefined i null  na empty string '', a potem sprawdzić, które z nich są required i do nich przypisać błąd, a pozostałe opuścić

        // get only fields that are not undefined
          if (model[editingRowId[0]][prop].value === undefined || model[editingRowId[0]][prop].value === null){
          rowObj[prop].value = '';
        } else {
          rowObj[prop] = model[editingRowId[0]][prop];
        }
    }

    console.log("rowObj-1");
    console.log(rowObj);

    const flatRowObj = await getFlatRowObj(rowObj);
    console.log("flatRowObj-1");
    console.log(flatRowObj);

    // make sure if there is any model being edited
    if (editingRowId.length > 0) {
      error.current = false;
      // const errors = validate(flatRowObj);
      const errors = validate(flatRowObj);
      console.log("errors-2");
      console.log(errors);
      console.log("rowObj-2");
      console.log(rowObj);

      const rowObjWithError = await markErrorInRowObj(rowObj, errors, error);

      if (!error.current) {
        console.log("OKAY");
        setEditRowData({
          id: Number(editingRowId[0]),
          ...getUpdatedRowObj(rowObjWithError),
        });
      }
    }

    setEditRowsModel({ ...model });
  };

  const editRowCommit = async (id) => {
    if (!error.current) {
      console.log("EDIT_ROW_COMMIT: ");
      console.log("editRowData");
      console.log(editRowData);

      editRowData.use_by_date = dateFormating(editRowData.use_by_date);

      const editRowDataNoHTML = await escapeHTMLentitiesForNaN(editRowData);

      await api_put(`${baseURLtoDB}/${id}`, editRowDataNoHTML);
      // apiResponseTxt('The record has been successfully amended');
    }
  };
  return { editRowsModel, editRowCommit, handleEditRowsModelChange };
};

export default useEditRow;
