import { useState, useContext } from "react";
import { checkIfMultiDel } from "../../functions/actionFns/delFns";


export const useModalCommands = (props) => {

    const {modal_action_name, baseURLtoDB, row_params, selection_row, rows_del, api_del, set_row_params, set_modal_action } = props;

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
     console.log("handleDelete1");
 
     if (!checkIfMultiDel(modal_action_name)) {
       await api_del(`${baseURLtoDB}/${row_params.id}`);
       handleClose();
       return;
     }
     await rows_del(selection_row);
     handleClose();
     console.log("handleDelete2");
   };

    return {modalOpen, handleClose, handleDelete, handleOpen};
}
