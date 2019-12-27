import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function expenseResultReducer(state = initialState.expenseResult, action) {
  switch(action.type) {
    case types.CREATE_EXPENSE_SUCCESS: {
      return action.expenseResult;
    }
    case types.CREATE_EXPENSE_FAILURE: {
      return action.expenseResult;
    }
    default:
      return state;
  }
}
