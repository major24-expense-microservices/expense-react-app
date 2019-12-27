import * as transactionsAutoloadApi from '../../api/transactionsAutoloadApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function transactionsAutoload(userId, numberOfTransactions) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return transactionsAutoloadApi.transactionsAutoload(userId, numberOfTransactions)
    .then(() => {
      dispatch(apiCallError());
      return true;
    })
    .catch(error => {
        dispatch(apiCallError(error));
        throw error;
    });
  }
}
