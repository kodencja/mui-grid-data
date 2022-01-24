import { combineReducers } from "redux";
import dataReducer from './apiReducer';


const rootReducer = combineReducers({data_from_db: dataReducer});

export default rootReducer;