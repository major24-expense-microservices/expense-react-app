import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../redux/actions/authenticationActions";
import { clearUser } from "../../redux/actions/userActions";
import { clearTransaction } from '../../redux/actions/transactionActions';
import { NavLink } from 'react-router-dom';

const LoginOutHeader = ({
  auth,
  clearTransaction,
  clearUser,
  logoutUser
}) => {
  const activeStyle = { color: '#F15B2A' };

  const handleLogout = (() => {
    sessionStorage.clear();
    clearTransaction();
    clearUser();
    logoutUser();
  });

  return (
      auth.loggedIn
        ? <NavLink to="/" onClick={handleLogout} activeStyle={activeStyle} exact>Logout | </NavLink>
        : <NavLink to="login"  activeStyle={activeStyle} exact>Login | </NavLink>

  );
}

LoginOutHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  clearUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearTransaction: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
const mapDispatchToProps = {
  logoutUser,
  clearUser,
  clearTransaction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOutHeader);
