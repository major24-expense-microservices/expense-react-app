import * as types from "./actionTypes";
import * as transactionApi from "../../api/transactionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadTransactionsSuccess(transactions) {
  return { type: types.LOAD_TRANSACTIONS_SUCCESS, transactions: transactions };
}
export function deleteTransactionSuccess(transaction) {
  return { type: types.DELETE_TRANSACTION, transaction: transaction };
}
export function AddTransactionSuccess(transaction) {
  return { type: types.ADD_TRANSACTION, transaction: transaction };
}
export function clearTransactionSuccess() {
  return { type: types.CLEAR_TRANSACTION, transactions: [] };
}

export function loadTransactions(userId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return transactionApi
      .getTransations(userId)
      .then(transactions => {
        let resultObj = transactions.entity
          ? transactions.entity
          : transactions;
        dispatch(loadTransactionsSuccess(resultObj));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteTransaction(transaction) {
  return function(dispatch) {
    dispatch(deleteTransactionSuccess(transaction));
  };
}

export function addTransaction(transaction) {
  return function(dispatch) {
    dispatch(AddTransactionSuccess(transaction));
  };
}

export function clearTransaction() {
  return function(dispatch) {
    dispatch(clearTransactionSuccess());
  };
}
