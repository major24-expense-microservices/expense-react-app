import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function transactionReducer(state = initialState.transactions, action) {
  switch(action.type) {
    case types.LOAD_TRANSACTIONS_SUCCESS: {
      return action.transactions;
    }
    case types.ADD_TRANSACTION: {
        return [...state, { ...action.transaction }];
    }
    case types.DELETE_TRANSACTION:
      return state.filter(transaction => transaction.id !== action.transaction.id);
    case types.CLEAR_TRANSACTION: {
      return action.transactions;
    }
    default:
      return state;
  }
}
