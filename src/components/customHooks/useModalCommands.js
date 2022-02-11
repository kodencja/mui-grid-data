import { useState } from "react";
import { throwErrDefined, throwErrUndefined } from "../../functions/validation/throwErrors";


export const useModalCommands = (props) => {

    const {modal_action_name, baseURLtoDB, row_params, selection_row, set_selection_row, rows_del, api_del, set_row_params, set_modal_action, multi_del } = props;

    const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (params = {}, name) => {

    try {
      console.log("handleOpen");
      console.log(params);
      console.log(name);
      throwErrUndefined(params);
      throwErrDefined('string', name);

      set_row_params(params);
      set_modal_action(name);
      setModalOpen(true);
    } catch (err) {
      console.log(
        "Error in handleOpen(): Error name: " + err.name + ". Error message: " + err.message
      );
    }
  };

  
 const handleClose = () => setModalOpen(false);

 const handleDelete = async (e) => {
  try {
    e.stopPropagation();
    //  console.log("modal_action_name");
    //  console.log(modal_action_name);
    //  if (!checkIfMultiDel(modal_action_name)) {
    if (modal_action_name !== multi_del) {
      set_selection_row([]);
      await api_del(`${baseURLtoDB}/${row_params.id}`);
      //  apiResponseTxt("The product has been removed from database!");
      handleClose();
      console.log("handleDelete1");

      return;
    }
    await rows_del(selection_row);
    //  apiResponseTxt("The products have been deleted!");
    handleClose();
    console.log("handleDelete2");
  } catch (err) {
    console.log(
      "Error in handleOpen(): Error name: " +
        err.name +
        ". Error message: " +
        err.message
    );
  }
};

    return {modalOpen, handleClose, handleDelete, handleOpen};
}
