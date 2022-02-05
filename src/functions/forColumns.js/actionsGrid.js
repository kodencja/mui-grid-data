
  export const handleEditClick = (event, params) => {
     // don't select this row after clicking
    event.stopPropagation();
    
    const api = params.api;
    api.setRowMode(params.id, "edit");
  };

  export const handleSaveClick = (event, params) => {
    event.stopPropagation();
    params.api.commitRowChange(params.id);
    params.api.setRowMode(params.id, "view");
    
    // update the row - not necessary now
    // const row = params.api.getRow(params.id);
    // params.api.updateRows([{ ...row }]);
  };

  export const handleCancelClick = (event, params) => {
    event.stopPropagation();
    const api = params.api;
    api.setRowMode(params.id, "view");
  };
