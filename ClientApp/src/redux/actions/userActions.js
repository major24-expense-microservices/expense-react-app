import * as types from './actionTypes';
import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadUserSuccess(user) {
  return { type: types.LOAD_USER_SUCCESS, user: user };
}
export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
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
      .then(savedUser => {
          dispatch(createUserSuccess(savedUser));
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
