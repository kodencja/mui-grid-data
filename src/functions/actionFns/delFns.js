

export const checkIfMultiDel = (modal_action_name) => {
  if (modal_action_name !== "multi_del") {
    return false;
  }
  return true;
};