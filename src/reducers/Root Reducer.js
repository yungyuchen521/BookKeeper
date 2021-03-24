import TransactionReducer from "./Transaction Reducer.js";
import CategoryReducer from "./Category Reducer.js";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
    transactions: TransactionReducer,
    categories: CategoryReducer
});

export default RootReducer;