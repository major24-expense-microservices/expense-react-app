import React from "react";
import PropTypes from "prop-types";

const ExpenseList = ({ transactions, onDeleteClick }) => (
  <div className="content">
    <div id="grid">
      <div id="row-header" className="row p-2">
        <div className="col-sm-2 bg-primary text-white">Date</div>
        <div className="col-sm-4 bg-primary text-white">Description</div>
        <div className="col-sm-2 bg-primary text-white">Amount</div>
        <div className="col-sm-2 bg-primary text-white">Category</div>
        <div className="col-sm-2 bg-primary text-white">Remove</div>
      </div>
      {transactions.map(transaction => {
        return (
          <div className="row mt-3" key={transaction.id}>
            <div className="col-sm-2 border-bottom">{transaction.transDate}</div>
            <div className="col-sm-4 border-bottom">{transaction.description}</div>
            <div className="col-sm-2 border-bottom text-right">{transaction.amount}</div>
            <div className="col-sm-2 border-bottom">{transaction.category}</div>
            <div className="col-sm-2">
              <button id="remove" type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDeleteClick(transaction)}>
                  Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  </div>
);

ExpenseList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ExpenseList;
