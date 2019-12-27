import * as types from "./actionTypes";
import * as authenticationApi from "../../api/authenticationApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

/** API Respone on success authentication, entity = false means auth failed
 * {
    "entity": true,
    "isSuccess": true,
    "error": null,
    "errors": []
    }
*/

export function authenticateUserSuccess(payload) {
  return { type: types.AUTHENTICATE_USER_SUCCESS, payload };
}
export function authenticateUserFailure(payload) {
  return { type: types.AUTHENTICATE_USER_FAILURE, payload };
}
export function logoutUserSuccess(payload) {
  return { type: types.LOGOUT_USER, payload };
}

export function authenticateUser(userCred) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authenticationApi
      .authenticateUser(userCred)
      .then(resp => {
        // Set true or false based on response
        if (resp.entity) {
          const payload = { loggedIn: resp.entity, userId: userCred.userId, error: '' };
          dispatch(authenticateUserSuccess(payload));
        } else {
          const error = 'Error authenticating user. Please check your credentials. ' + resp.error;
          const payload = { loggedIn: resp.entity, userId: '', error: error };
          dispatch(apiCallError(error));
          dispatch(authenticateUserFailure(payload));
        }
      })
      .catch(error => {
        console.log(">>Error authenticating user: ", error);
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function logoutUser() {
  const payload = { loggedIn: false, userId: '', error: '' };
  return function(dispatch) {
    dispatch(logoutUserSuccess(payload));
  };
}
