import { combineReducers } from "redux";
import apiReducer from './api/apiReducer';
import gridReducer from "./gridActions/gridReducer";

const rootReducer = combineReducers({api_db: apiReducer, grid_actions: gridReducer});

export default rootReducer;