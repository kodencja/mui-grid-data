import { throwErrDefined, throwErrUndefined } from "../validation/throwErrors";

export const checkIfMultiDel = (modal_action_name) => {

try {
  throwErrUndefined(modal_action_name);
  throwErrDefined('string', modal_action_name);
  if (modal_action_name !== "multi_del") {
    return false;
  }
  return true;
} catch (err) {
  console.log("Error in checkIfMultiDel(): Error name: " + err.name + ". Error message: " + err.message);
}
};