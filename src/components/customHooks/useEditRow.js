import React, { useState, useRef, useEffect } from "react";
import { format, parseISO, formatISO } from "date-fns";
import { validate } from "../../functions/validation/validation";
import { escapeHTMLentitiesForNaN } from "../../functions/validation/escapeHTMLent";
import {
  getFlatRowObj,
  getUpdatedRowObj,
  markErrorInRowObj,
} from "../../functions/editRowFns";

const useEditRow = (api_put, baseURLtoDB) => {
  const [editRowsModel, setEditRowsModel] = useState({});

  // save row data after editing
  const [editRowData, setEditRowData] = useState({});
  const [error, setError] = useState(false);

  const handleEditRowsModelChange = async (model) => {
    const editingRowId = Object.keys(model); // 5
    const rowObj = model[editingRowId[0]];
    const modelChecked = { ...model };

    const flatRowObj = await getFlatRowObj(rowObj);

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
    setEditRowsModel(modelChecked);
  };

  const editRowCommit = async (id) => {
    console.log("EDIT_ROW_COMMIT: ");

    editRowData.use_by_date = format(
      new Date(editRowData.use_by_date),
      "Y-MM-dd"
    );

    const editRowDataNoHTML = await escapeHTMLentitiesForNaN(editRowData);

    await api_put(`${baseURLtoDB}/${id}`, editRowDataNoHTML);
  };
  return { editRowsModel, editRowCommit, handleEditRowsModelChange };
};

export default useEditRow;
