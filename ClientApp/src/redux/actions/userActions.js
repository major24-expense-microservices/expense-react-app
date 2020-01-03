import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadUserSuccess(user) {
  return { type: types.LOAD_USER_SUCCESS, user: user };
}
export function createUserSuccess(expenseResult) {
  return { type: types.CREATE_EXPENSE_SUCCESS, expenseResult };
}
export function createUserFailure(expenseResult) {
  return { type: types.CREATE_EXPENSE_FAILURE, expenseResult };
}
export function clearUserSuccess() {
  return { type: types.CLEAR_USER, user: {} };
}

export function loadUser(userId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUser(userId)
      .then(user => {
        let userObj = user.entity ? user.entity : user;
        dispatch(loadUserSuccess(userObj));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(user) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return userApi.saveUser(user)
      .then(savedUserResult => {
        console.log('>>>>>savedExpenseResult:', savedUserResult);
        if (savedUserResult.isSuccess) {
          dispatch(createUserSuccess(savedUserResult));
        } else {
          dispatch(apiCallError(savedUserResult.error));
          dispatch(createUserFailure(savedUserResult));
        }
        // if (saveUser.isSuccess) {
        //   dispatch(createUserSuccess(savedUser));
        // } else {
        //   return saveUser;
        // }

      }).catch(error => {
        dispatch(apiCallError(error));
        throw error;
    });
  }
}

export function clearUser() {
  return function (dispatch) {
    dispatch(clearUserSuccess());
  }
}
