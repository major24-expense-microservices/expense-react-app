import React from "react";
import PropTypes from "prop-types";

const UserDisplay = ({ user }) => {
  return (
    <div>
      <h5 className="display-5">{user.firstName} {user.lastName}</h5>
      <div>
        <span>User Id: </span>
        <span>{user.userId}</span>
      </div>
      <div>
        <span>Email: </span>
        <span>{user.email}</span>
      </div>
      <div>
        <span>CC#: </span>
        <span>{user.costCentre}</span>
      </div>
    </div>
  );
};

UserDisplay.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserDisplay;
