import React, {useState } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";
import { addTransaction } from "../../redux/actions/transactionActions";
import { getGuid } from '../../utils/uniqueIdService';

const ExpenseForm = ({
  user,
  lookup,
  history,
  addTransaction,
  ...props
}) => {
  const [transaction, setTransaction] = useState({});
  const [errors, setErrors] = useState({ ...props.errors });
  const [ saving, setSaving ] = useState(false);

  // event handlers
  function handleChange(event) {
    const { name, value } = event.target;
    setTransaction(prevState => ({
      ...prevState,
      [name]:  value
    }));
  }

  function isFormValid() {
    const { transDate, description, amount, category } = transaction;
    const errors = {};
    if (!transDate) errors.transDate = 'Transaction date is required';
    if (!description) errors.description = 'Description is required';
    if (!amount) errors.amount = 'Amount is required';
    if (!category) errors.category = 'Category is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    setSaving(true);
    // Tax is optional, if not found add zero to be saved
    transaction.hasOwnProperty('tax') ? null : transaction.tax = 0;
    // Add id, userId and TransType = 'OOP'
    transaction.id = getGuid();
    transaction.userId = user.userId;
    transaction.transType = 'OOP';
    transaction.amount = Number(transaction.amount).toFixed(2);
    addTransaction(transaction);
    history.push('/manage-expense');
  }

  function handleCancel() {
    history.push('/manage-expense');
  }

  return (
    <div>
      <h3>Add Transaction Expense</h3>
      <div className="container-fluid">
        <div className="form-group">
          <div id="row-header" className="row">
            <div className="col-md-6">Date</div>
          </div>
          <div id="row-header" className="row">
            <div className="col-md-6 mb-2">
              <input
                name="transDate"
                type="date"
                onChange={handleChange}
                className="form-control"
                placeholder="YYYYMMDD"
              />
              {errors.transDate && <div className="alert alert-danger">{errors.transDate}</div>}
            </div>
          </div>

          <div id="row-header" className="row">
            <div className="col-md-6">Description</div>
          </div>
          <div id="row-header" className="row">
            <div className="col-md-6 mb-2">
              <input
                name="description"
                type="text"
                onChange={handleChange}
                className="form-control"
              />
              {errors.description && <div className="alert alert-danger">{errors.description}</div>}
            </div>
          </div>

          <div id="row-header" className="row">
            <div className="col-md-6">Amount</div>
          </div>
          <div id="row-header" className="row">
            <div className="col-md-6 mb-2">
              <input
                name="amount"
                type="number"
                onChange={handleChange}
                className="form-control"
              />
              {errors.amount && <div className="alert alert-danger">{errors.amount}</div>}
              <div className="text-danger" v-if="errors.amount"></div>
            </div>
          </div>

          <div id="row-header" className="row">
            <div className="col-md-6">Tax</div>
          </div>
          <div id="row-header" className="row">
            <div className="col-md-6 mb-2">
              <input
                name="tax"
                type="number"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div id="row-header" className="row">
            <div className="col-md-6 mb-2">
              <SelectInput
                name="category"
                label="Expense Category"
                onChange={handleChange}
                options={lookup.expenseCategory}
                 />
              {errors.category && <div className="alert alert-danger">{errors.category}</div>}
            </div>
          </div>

          <div id="row-header" className="row">
            <div className="col-md-6 mb-2">
              <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
              <button type="button" onClick={handleSave} disabled={saving} className="btn btn-primary ml-2">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ExpenseForm.propTypes = {
  user: PropTypes.object.isRequired,
  lookup: PropTypes.object.isRequired,
  addTransaction: PropTypes.func.isRequired,
  errors: PropTypes.array,
  history: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    lookup: state.lookup
  };
}

const mapDispatchToProps = {
  addTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
