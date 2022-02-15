import { throwErrMin, throwErrUndefined } from "../validation/throwErrors";

export const handleEditClick = (event, params) => {
  try {
    throwErrUndefined(event);
    throwErrUndefined(params);
    throwErrMin(params.id, 0);

    // don't select this row after clicking
    event.stopPropagation();

    const api = params.api;
    // change row mode to edit
    api.setRowMode(params.id, "edit");

    // set focus on first field 'name'
    api.setCellFocus(params.id, 'name');
  } catch (err) {
    console.log(
      `Error for field of ID ${params.id}: Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const handleSaveClick = (event, params) => {
  try {
    throwErrUndefined(event);
    throwErrUndefined(params);
    throwErrMin(params.id, 0);

    event.stopPropagation();
    params.api.commitRowChange(params.id);
    params.api.setRowMode(params.id, "view");

    // update the row - not necessary now as it is updated throught api_put / putData action in redux
    // const row = params.api.getRow(params.id);
    // params.api.updateRows([{ ...row }]);
  } catch (err) {
    console.log(
      `Error for field of ID ${params.id}: Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};

export const handleCancelClick = (event, params) => {
  try {
    throwErrUndefined(event);
    throwErrUndefined(params);
    throwErrMin(params.id, 0);

    event.stopPropagation();
    const api = params.api;
    api.setRowMode(params.id, "view");
  } catch (err) {
    console.log(
      `Error for field of ID ${params.id}: Error name: ${err.name}. Error message: ${err.message}`
    );
  }
};
