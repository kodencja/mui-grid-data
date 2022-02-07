import { useState, useContext } from "react";
import { checkIfMultiDel } from "../../functions/actionFns/delFns";


export const useModalCommands = (props) => {

    const {modal_action_name, baseURLtoDB, row_params, selection_row, set_selection_row, rows_del, api_del, set_row_params, set_modal_action, multi_del, apiResponseTxt } = props;

    const [modalOpen, setModalOpen] = useState(false);

// przy rows_del nie ma 'params'
  const handleOpen = (params = {}, name) => {
    set_row_params(params);
    set_modal_action(name);
    setModalOpen(true);
  };

  
 const handleClose = () => setModalOpen(false);

   const handleDelete = async (e) => {
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
   };

    return {modalOpen, handleClose, handleDelete, handleOpen};
}
