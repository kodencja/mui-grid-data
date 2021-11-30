import React, {useState} from 'react';
import {
    final_text_resp,
    api_method,
    current_url,
    post_data,
  } from "../../components/reducer/types";

const useEditRow = (dispatch, baseURLtoDB) => {
    const [editRowsModel, setEditRowsModel] = useState({});
  // store row data after editing
  const [editRowData, setEditRowData] = useState({});

  const handleEditRowsModelChange = (model) => {
    console.log("handleEditRowsModelChange");
    console.log("model");
    console.log(model); 
    // model:  {5: brutto: {value: 109.47}, id: 5, name: {value: 'Broom'}, netto: {value: 95}, origin: {value: 'Sweden'}, useByDate: {value: '2021-10-30'} }
    // row: {id: 5, name: 'Broom', netto: 92, brutto: 109.47, origin: 'Sweden', …}
    const editedIds = Object.keys(model); // 3
    // console.log(editedIds);
    const getUpdatedRowObj = () => {
      const rowUpdated = {};
      for (const [key, val] of Object.entries(model[editedIds[0]])) {
        rowUpdated[key] = val.value;
      }
      // console.log(rowUpdated);
      return rowUpdated;
    };

    // user stops editing when the edit model is empty
    if (editedIds.length === 0) {
      // alert(JSON.stringify(editRowData, null, 4));
      // console.log(editRowData);
      console.log("editedIds.length === 0");
      // update on firebase
    } else {
      // setEditRowData({ id: editedIds[0], ...model[editedIds[0]] });
      // setEditRowData({ ...editRowData, ...model[editedIds[0]] });

      // TUTAJ ROBIMY VALIDATION
      if (model[editedIds[0]].Name.value.length < 3) {
        console.log("Too SHORT");
        return;
        // return false;
        // setEditRowData({});
      } else {
        console.log("OKAY");
        setEditRowData({ id: Number(editedIds[0]), ...getUpdatedRowObj() });
      }

    }
    setEditRowsModel(model);
    // console.log("model");
    // console.log(model);
    console.log("editRowData");
    console.log(editRowData);
  };
  //   [editRowData]
  // );

  const editRowCommit = (id) => {
    console.log("EDIT_ROW_COMMIT: ");
    console.log(id); // id number
    // console.log(editRowsModel);
    // console.log(editRowData);
    // TUTAJ ROBIMY ROW UPDATE - trzeba pobrać dany row i zmienić currentURLtoDB na typu update
    dispatch({ type: post_data, payload: editRowData });
    dispatch({ type: api_method, payload: "PUT" });
    dispatch({ type: current_url, payload: `${baseURLtoDB}/${id}` });
  };
return {editRowsModel, editRowCommit, handleEditRowsModelChange}
}

export default useEditRow
