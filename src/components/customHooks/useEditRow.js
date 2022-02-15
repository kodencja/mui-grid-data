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

  
  const handleEditRowsModelChange = async (model) => {
      try {
        throwErrDefined("object", model);

        const editingRowId = Object.keys(model);

    // shorten editingRowId array and model object to prevent user from editing more than one row at the same time
        if(Object.keys(model).length < 2) {
          editingRowIdPrev.current = editingRowId[0];
        } else {
          editingRowId.splice(editingRowId.indexOf(editingRowIdPrev.current), 1);
          model = { [editingRowId[0]]: {...model[editingRowId[0]] } };
          editingRowIdPrev.current = editingRowId[0];
        }
  
        const rowObj = model[editingRowId[0]];
        for (let prop in model[editingRowId[0]]) {
  
          // najpierw zamienic wszystkie undefined i null  na empty string '', a potem sprawdzić, które z nich są required i do nich przypisać błąd, a pozostałe opuścić, gdyż nie są required
  
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
  
  
        // make sure if there is any model being edited
        if (editingRowId.length > 0) {
          const flatRowObj = await getFlatRowObj(rowObj);
  
          error.current = false;
          const errors = await validate(flatRowObj);
  
          const rowObjWithError = await markErrorInRowObj(rowObj, errors, error);
  
          if (!error.current) {
            console.log("OKAY");
            setEditRowError(false);
            setEditRowData({
              id: Number(editingRowId[0]),
              ...getUpdatedRowObj(rowObjWithError),
            });
          } else {
            setEditRowError(true);
          }
        } 
        setEditRowsModel({ ...model });

      } catch (err) {
          console.log(
            "Error in handleEditRowsModelChange(): Error name: " + err.name + ". Error message: " + err.message
          );
      }
  };

  const editRowCommit = async (id) => {
    try {
      throwErrUndefined(id);
      throwErrDefined("number", id);
      editingRowIdPrev.current = '';
      if (!error.current) {

        editRowData.use_by_date = dateFormating(editRowData.use_by_date);

        const editRowDataNoHTML = await escapeHTMLentitiesForNaN(editRowData);

        await api_put(`${baseURLtoDB}/${id}`, editRowDataNoHTML);
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
