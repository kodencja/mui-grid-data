import { useState, useRef, useCallback, useContext } from "react";
import { ActionsContext } from "../../App";
import { validate } from "../../functions/validation/validation";
import { escapeHTMLentitiesForNaN } from "../../functions/validation/escapeHTMLent";
import {
  getFlatRowObj,
  getUpdatedRowObj,
  markErrorInRowObj,
} from "../../functions/actionFns/editRowFns";
import { dateFormating } from "../../functions/formatParse/formatParse";
import {
  throwErrDefined,
  throwErrUndefined,
} from "../../functions/validation/throwErrors";

const useEditRow = (api_put, baseURLtoDB) => {
  const [editRowsModel, setEditRowsModel] = useState({});

const actsContext = useContext(ActionsContext);

const { setEditRowError } = actsContext;

  // save row data after editing
  const [editRowData, setEditRowData] = useState({});
  const error = useRef(false);
  const editingRowIdPrev = useRef('');

  // const handleEditRowsModelChange = useCallback( async (model) => {
  const handleEditRowsModelChange = async (model) => {
      try {
        throwErrDefined("object", model);

        // console.log("model-0");
        // console.log(model);

        // console.log("editingRowIdPrev.current-0");
        // console.log(editingRowIdPrev.current);

        const editingRowId = Object.keys(model);

    // shorten editingRowId array and model object to prevent user from editing more than one row at the same time
        if(Object.keys(model).length < 2) {
          editingRowIdPrev.current = editingRowId[0];
        } else {
          // console.log(editingRowId.indexOf(editingRowIdPrev.current));
          editingRowId.splice(editingRowId.indexOf(editingRowIdPrev.current), 1);
          model = { [editingRowId[0]]: {...model[editingRowId[0]] } };
          editingRowIdPrev.current = editingRowId[0];
        }
  
        const rowObj = model[editingRowId[0]];
        for (let prop in model[editingRowId[0]]) {
          // null, undefined, false, 0, ''
  
          // najpierw zamienic wszystkie undefined i null  na empty string '', a potem sprawdzić, które z nich są required i do nich przypisać błąd, a pozostałe opuścić
  
          // get only fields that are not undefined
          if (
            model[editingRowId[0]][prop].value === undefined ||
            model[editingRowId[0]][prop].value === null
          ) {
            rowObj[prop].value = "";
          } else {
            rowObj[prop] = model[editingRowId[0]][prop];
          }
        }
  
        // console.log("rowObj-1");
        // console.log(rowObj);
  
        // make sure if there is any model being edited
        if (editingRowId.length > 0) {
          // console.log("editingRowId.length");
          // console.log(editingRowId.length);
          const flatRowObj = await getFlatRowObj(rowObj);
          // console.log("flatRowObj-1");
          // console.log(flatRowObj);
  
          error.current = false;
          // const errors = validate(flatRowObj);
          const errors = await validate(flatRowObj);
          console.log("errors-4");
          console.log(errors);
          // console.log("rowObj-2");
          // console.log(rowObj);
  
          const rowObjWithError = await markErrorInRowObj(rowObj, errors, error);
  
          console.log("rowObjWithError");
          console.log(rowObjWithError);
  
          if (!error.current) {
            console.log("OKAY");
            setEditRowError(false);
            setEditRowData({
              id: Number(editingRowId[0]),
              // ...getUpdatedRowObj(rowObj),
              ...getUpdatedRowObj(rowObjWithError),
            });
          } else {
            setEditRowError(true);
          }
        }
  
        // console.log("model[editingRowId[0]]");
        // console.log(model[editingRowId[0]]);

        // console.log("model-3");
        // console.log(model);
  
        // setEditRowsModel(rowObj);
        // setEditRowsModel(model);
        setEditRowsModel({ ...model });
        // setEditRowsModel(model[editingRowId[0]]);
        // setEditRowsModel({ ...model[editingRowId[0]] });
      } catch (err) {
        if (err && err.message) {
          console.log(
            "Error in handleEditRowsModelChange(): Error name: " + err.name + ". Error message: " + err.message
          );
        } else {
          console.log("Error in handleEditRowsModelChange(): " + err);
        }
      }
  };
  // }, []);


  const editRowCommit = async (id) => {
    try {
      throwErrUndefined(id);
      throwErrDefined("number", id);
      editingRowIdPrev.current = '';
      if (!error.current) {
        console.log("EDIT_ROW_COMMIT: ");
        console.log("editRowData");
        console.log(editRowData);

        editRowData.use_by_date = dateFormating(editRowData.use_by_date);

        const editRowDataNoHTML = await escapeHTMLentitiesForNaN(editRowData);

        await api_put(`${baseURLtoDB}/${id}`, editRowDataNoHTML);
        // apiResponseTxt('The record has been successfully amended');
      }
    } catch (err) {
      console.log(
        "Error in editRowCommit(): Error name: " + err.name + ". Error message: " + err.message
      );
    }
  };
  return { editRowsModel, editRowCommit, handleEditRowsModelChange };
};

export default useEditRow;
