import React from "react";
import { Link } from "react-router-dom";
import CreateLinkButton from './CreateLinkButton';

const UserNotFound = () => {
  return (
    <div>
      <div className="alert alert-danger">
        <strong>User not found!</strong>
      </div>
      <div>
        If you are an existing user, please click to <Link to="/login">Login</Link>
      </div>
      <div className="mt-4">
        If you are new a user, please create your profile.
      </div>
      <div className="mt-2">
        <CreateLinkButton label="Create User" urlPath="/manage-user" />
      </div>
    </div>
  );
};

export default UserNotFound;
