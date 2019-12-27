import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveUser } from "../../redux/actions/userActions";
import UserForm from "./UserForm";
import { toast } from 'react-toastify';

export function ManageUserContainer({
  saveUser,
  lookup,
  history,
   ...props }) {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({ ...props.errors });
  const [ saving, setSaving ] = useState(false);

  // event handlers
  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]:  value
    }));
  }

  function isFormValid() {
    const { userId, password, firstName, lastName, email, costCentre } = user;
    const errors = {};
    if (!userId) errors.userId = 'UserId is required';
    if (!password) errors.password = 'Password is required';
    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) errors.email = 'Email is required';
    if (!costCentre) errors.costCentre = 'Cost Centre is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    setSaving(true);
    // SPECIAL CHG for JSON Server. It requires id to save and lookup
    user.id = user.userId;
    saveUser(user).then(() => {
      toast.success("User Info has been saved.");
      history.push("/user-profile");
    }).catch(error => {
      console.log('>>>', error);
      setSaving(false);
      setErrors({ onSave: error.message })
    })
  }

  return (
    <div>
      <UserForm
        user={user}
        costCentre={lookup.costCentre}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
        errors={errors} />
    </div>
  );
}

ManageUserContainer.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  saveUser: PropTypes.func.isRequired,
  lookup: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    lookup: state.lookup
  };
}
const mapDispatchToProps = {
  saveUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUserContainer);
