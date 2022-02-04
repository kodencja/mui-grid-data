import { combineReducers } from "redux";
import apiReducer from './api/apiReducer';
import constantsReducer from "./constants/constantsReducer";
import gridReducer from "./gridActions/gridReducer";

const rootReducer = combineReducers({api_db: apiReducer, grid_actions: gridReducer, constantsReducer: constantsReducer});

export default rootReducer;