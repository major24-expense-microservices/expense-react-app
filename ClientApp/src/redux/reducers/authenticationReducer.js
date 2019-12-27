import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.auth, action) {
  switch(action.type) {
    case types.AUTHENTICATE_USER_SUCCESS: {
      return {...state,
        loggedIn: action.payload.loggedIn,
        userId: action.payload.userId,
        error: action.payload.error };
    }
    case types.AUTHENTICATE_USER_FAILURE: {
      return {...state,
        loggedIn: action.payload.loggedIn,
        userId: action.payload.userId,
        error: action.payload.error };
    }
    case types.LOGOUT_USER: {
      return {...state,
        loggedIn: action.payload.loggedIn,
        userId: action.payload.userId,
        error: action.payload.error };
    }
    default:
      return state;
  }
}
