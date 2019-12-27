import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { transactionsAutoload } from "../../redux/actions/transactionsAutoloadActions";
import { toast } from "react-toastify";

const CreateSampleTransactions = ({ user, transactionsAutoload, ...props }) => {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({ ...props.errors });

  function handleCreateTransactions() {
    console.log(user);
    const numOfTrans = 5;
    event.preventDefault();
    setSaving(true);
    transactionsAutoload(user.userId, numOfTrans)
      .then(() => {
        setSaving(false);
        toast.success(
          `${numOfTrans} sample transactions have been created for ${user.firstName}`
        );
      })
      .catch(error => {
        setSaving(false);
        const errors = {};
        errors.onCreateTransactions = error.message;
        setErrors(errors);
        console.log(">>>", errors);
      });
  }

  return (
    <div className="ml-4">
      <h3 className="display-5">Create Sample Transactions</h3>
      <div>
        <strong>
          User: {user.firstName} {user.lastName}
        </strong>
      </div>
      <div className="mt-2">
        This function should create sample transactions for logged in user.
      </div>
      <div className="mt-2">
        This is to simulate expensed transactions were loaded by Master card or
        Visa card to our system. (db)
      </div>
      <div className="mt-4">
        <button
          type="button"
          disabled={saving}
          className="btn btn-warning"
          onClick={handleCreateTransactions}
        >
          {saving ? "Creating Transactions..." : "Create Transactions"}
        </button>
        {errors.onCreateTransactions && (
          <div className="alert alert-danger">
            {errors.onCreateTransactions}
          </div>
        )}
      </div>
    </div>
  );
};

CreateSampleTransactions.propTypes = {
  user: PropTypes.object.isRequired,
  transactionsAutoload: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
const mapDispatchToProps = {
  transactionsAutoload
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateSampleTransactions);
