import { useState } from "react";
import { format } from "date-fns";
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
  const [error, setError] = useState(false);

  const handleEditRowsModelChange = async (model) => {
    const editingRowId = Object.keys(model); // e.g. 1 or 5
    const rowObj = model[editingRowId[0]];
    setEditRowsModel({ ...model });

    const flatRowObj = await getFlatRowObj(rowObj);

    // make sure if there is any model being edited
    if (editingRowId.length > 0) {
      setError(false);
      const errors = validate(flatRowObj);

      await markErrorInRowObj(rowObj, errors, setError);

      if (!error) {
        console.log("OKAY");
        setEditRowData({
          id: Number(editingRowId[0]),
          ...getUpdatedRowObj(rowObj),
        });
      }
    }
   
  };

  const editRowCommit = async (id) => {
    console.log("EDIT_ROW_COMMIT: ");

    editRowData.use_by_date = dateFormating(editRowData.use_by_date);

    const editRowDataNoHTML = await escapeHTMLentitiesForNaN(editRowData);

    await api_put(`${baseURLtoDB}/${id}`, editRowDataNoHTML);
  };
  return { editRowsModel, editRowCommit, handleEditRowsModelChange };
};

export default useEditRow;
