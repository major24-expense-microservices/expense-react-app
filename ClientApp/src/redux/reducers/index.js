import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import user from "./userReducer";
import transactions from "./transactionReducer";
import lookup from "./lookupReducer";
import expense from './expenseReducer';
import expenseResult from './expenseResultReducer';
import auth from './authenticationReducer';

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  apiCallsInProgress,
  user: user,
  transactions: transactions,
  lookup: lookup,
  expense: expense,
  auth,
  expenseResult
});

export default rootReducer;
