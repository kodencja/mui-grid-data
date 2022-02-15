import { useState } from "react";
import { throwErrDefined, throwErrUndefined } from "../../functions/validation/throwErrors";


export const useModalCommands = (props) => {

    const {modal_action_name, baseURLtoDB, row_params, selection_row, set_selection_row, rows_del, api_del, set_row_params, set_modal_action, multi_del, apiResponseTxt } = props;

    const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = (params = {}, name) => {

    try {
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
    if (modal_action_name !== multi_del) {
      set_selection_row([]);

      await api_del(`${baseURLtoDB}/${row_params.id}`);
      handleClose();

      return;
    }
    await rows_del(selection_row);

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
