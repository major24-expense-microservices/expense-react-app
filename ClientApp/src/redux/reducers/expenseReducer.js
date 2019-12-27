import initialState from './initialState';

export default function expenseReducer(state = initialState.expense, action) {
  switch(action.type) {
    default:
      return state;
  }
}
