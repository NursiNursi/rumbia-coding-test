import { combineReducers } from "redux";
import { ProductReducer } from "./productReducers";

const rootReducer = combineReducers({ product: ProductReducer });
export default rootReducer;
