import * as types from './actionTypes';
import * as expenseApi from '../../api/expenseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function createExpenseSuccess(expenseResult) {
  return { type: types.CREATE_EXPENSE_SUCCESS, expenseResult };
}
export function createExpenseFailure(expenseResult) {
  return { type: types.CREATE_EXPENSE_FAILURE, expenseResult };
}

export function saveExpense(expense) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return expenseApi.saveExpense(expense)
      .then(savedExpenseResult => {
        console.log('>>>>>savedExpenseResult:', savedExpenseResult);
        if (savedExpenseResult.isSuccess) {
          dispatch(createExpenseSuccess(savedExpenseResult));
        } else {
          dispatch(apiCallError(savedExpenseResult.error));
          dispatch(createExpenseFailure(savedExpenseResult));
        }
      }).catch(error => {
        dispatch(apiCallError(error));
        throw error;
    });
  }
}
