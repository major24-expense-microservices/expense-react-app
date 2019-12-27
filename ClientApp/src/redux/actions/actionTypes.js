export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

// USER / EXPENSE PROFILES
export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";

export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_FAILURE = "AUTHENTICATE_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const CLEAR_USER = "CLEAR_USER";

export const LOAD_TRANSACTIONS_SUCCESS = "LOAD_TRANSACTIONS_SUCCESS";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const CREATE_EXPENSE_SUCCESS = "CREATE_EXPENSE_SUCCESS";
export const CREATE_EXPENSE_FAILURE = "CREATE_EXPENSE_FAILURE";
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const CLEAR_TRANSACTION = "CLEAR_TRANSACTION";