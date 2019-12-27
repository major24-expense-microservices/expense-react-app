import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadTransactions, deleteTransaction, clearTransaction } from "../../redux/actions/transactionActions";
import { saveExpense } from "../../redux/actions/expenseActions";
import ExpenseList from './ExpenseList';
import SelectInput from "../common/SelectInput";
import CreateLinkButton from './CreateLinkButton';
import Spinner from "../common/Spinner";

export function ManageExpenseContainer({
  user,
  transactions,
  loadTransactions,
  deleteTransaction,
  clearTransaction,
  saveExpense,
  numOfTransactions,
  lookupCostCentre,
  history,
  loading,
  expenseResult,
  ...props
}) {
  const [expense, setExpense] = useState({ ...props.expense });
  const [errors, setErrors] = useState({ ...props.errors });
  const [verify, setVerify] = useState(false);
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    if (!user.userId) return;
    if (transactions.length > 0) return;
      loadTransactions(user.userId)
      .then(() => {
      })
      .catch(error => {
        console.log("Error loading transactions. " + error);
      });
  }, []);

  useEffect(() => {
    if (expenseResult) {
      if (expenseResult.isSuccess) {
        const message = "Success-Expense Info has been saved. Expense Id:" + expenseResult.entity;
        clearTransaction();
        setSaving(false);
        history.push({ pathname: '/show-message', state: {message: message } });
      } else {
        const message = "Error: " + expenseResult.error;
        history.push({ pathname: '/show-message', state: {message: message } });
      }
    }
  }, [expenseResult]);

  // event handlers
  function handleDelete(transaction) {
    deleteTransaction(transaction);
    setVerify(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setExpense(prevState => ({
      ...prevState,
      [name]:  value
    }));
    errors[name] = "";
  }

  // TODO: approverId is required. HARD CODING for now...
  // TODO: Set approverId based on CC selected. Give option in the form...
  function setExpenseData() {
    setExpense(prevState => ({
      ...prevState,
      expenseItems: transactions,
      user: user,
      approverId: 'user9'
    }));
  }

  // function clearExpenseData() {
  //   setExpense(prevState => ({
  //     ...prevState,
  //     expenseItems: [],
  //     user: {}
  //   }));
  // }

  function handleSave(event) {
    event.preventDefault();
    console.log('ready to save: ', expense);
    setSaving(true);
    saveExpense(expense).then(() => {
      //toast.success("Expense Info has been saved.", resp);
      //clearTransaction();
      //history.push("/user-profile");
    }).catch(error => {
      console.log('>>>', error);
      setSaving(false);
    })
  }

  function handleVerify() {
    const errors = {};
    if (transactions.length < 1) {
      errors.expenseItems = 'No expense items found to submit';
    }
    if (!expense.hasOwnProperty('costCentre') || expense.costCentre === "") {
      errors.costCentre = "Cost Center is required";
    }
    setErrors(errors);
    Object.keys(errors).length > 0 ? setVerify(false) : setVerify(true);

    // No errors..
    setExpenseData();
  }

  return (
    <div className="ml-4">
      <h3 className="display-5">Expense Report</h3>
      {/* <p>={message.info && <div className="alert alert-success">{message.info}</div>}</p>
      <p>=={message.error && <div className="alert alert-danger">{message.error}</div>}</p> */}
      <p>={JSON.stringify(expenseResult)}</p>
      {loading ? (
        <Spinner />
      ) : (

        user.userId === ""
        ? <div className="alert alert-danger">
            <strong>User not loaded. You may have refrehsed the page, which clears the state. Click [User Profile] to reload!</strong>
          </div>
        : <div>
            <div className="mt-4 mb-4">
              Number Of Transactions: {numOfTransactions}
            </div>

            <div className="mt-5">
              <CreateLinkButton label="Add Expense" urlPath="/add-expense" />
            </div>

            <ExpenseList transactions={transactions} onDeleteClick={handleDelete}/>
            <hr />
            <SelectInput
              name="costCentre"
              label="Cost Centre"
              options={lookupCostCentre}
              onChange={handleChange}
              error={errors.costCentre} />
            <input type="checkbox" name="verify" id="verify" checked={verify} onChange={handleVerify} />
            <span>Verify expenses and add to checkout!</span>
            <div>
              <button type="submit" disabled={!verify} onClick={handleSave} className="btn btn-primary">
                {saving ? "Saving..." : "Save"}
              </button>
              <div>
                {errors.expenseItems && <div className="alert alert-danger">{errors.expenseItems}</div>}
              </div>
            </div>
          </div>
      )
      }
    </div>
  );
}

ManageExpenseContainer.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  loadTransactions: PropTypes.func.isRequired,
  clearTransaction: PropTypes.func.isRequired,
  lookupCostCentre: PropTypes.array.isRequired,
  saveExpense: PropTypes.func.isRequired,
  numOfTransactions: PropTypes.number,
  expense: PropTypes.object,
  errors: PropTypes.object,
  deleteTransaction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  expenseResult: PropTypes.object,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user,
    transactions: state.transactions,
    numOfTransactions: state.transactions ? state.transactions.length : 0,
    lookupCostCentre: state.lookup.costCentre,
    expense: state.expense,
    loading: state.apiCallsInProgress > 0,
    expenseResult: state.expenseResult
  };
}
const mapDispatchToProps = {
  loadTransactions,
  deleteTransaction,
  clearTransaction,
  saveExpense
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageExpenseContainer);
