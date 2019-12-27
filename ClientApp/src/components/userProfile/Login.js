import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authenticateUser } from "../../redux/actions/authenticationActions";

const Login = ({
  authenticateUser,
  auth,
  history,
  ...props }) => {
  const [userCred, setUserCred] = useState({});
  const [errors, setErrors] = useState({ ...props.errors });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (auth.loggedIn) {
      console.log('User is good to go. setting user session');
      sessionStorage.setItem("userId", userCred.userId);
      history.push("/user-profile");
    } else {
      console.log('clearing session');
      sessionStorage.clear();
    }
  }, [auth]);

  function isFormValid() {
    const { userId, password } = userCred;
    const errors = {};
    if (!userId) errors.userId = "UserId is required";
    if (!password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function onSubmit() {
    event.preventDefault();
    sessionStorage.clear();
    if (!isFormValid()) return;
    setSaving(true);
    authenticateUser(userCred)
      .then(() => {
        setSaving(false);
      })
      .catch(error => {
        console.log(">>>Error-Login: ", error);
        setSaving(false);
      });
  }

  function onChange(event) {
    const { name, value } = event.target;
    setUserCred(prevUserCred => ({
      ...prevUserCred,
      [name]: value
    }));
  }

  return (
    <div className="ml-4">
      <h3 className="display-5">Login</h3>
      <form onSubmit={onSubmit} className="mt-4">
        <div>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder="User Id"
            onChange={onChange}
            className="form-control mt-2"
          ></input>
          {errors.userId && (
            <div className="alert alert-danger">{errors.userId}</div>
          )}
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            className="form-control mt-2"
          ></input>
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}
        </div>
        <div className="mt-2">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Submitting..." : "Submit"}
          </button>
          {auth.error && (
            <div className="alert alert-danger">{auth.error}</div>
          )}
        </div>

        {/* <hr />
        <button onClick={() => {sessionStorage.setItem("userId", "user1");}}>
          Set session with user1
        </button>
        <button
          onClick={() => {sessionStorage.clear();}}>
          Session clear
        </button> */}

      </form>
    </div>
  );
};

Login.propTypes = {
  saving: PropTypes.bool,
  authenticateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.array,
  history: PropTypes.object
};

function mapStateToProps(state) {
  return{
    auth: state.auth
  };
}
const mapDispatchToProps = {
  authenticateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
