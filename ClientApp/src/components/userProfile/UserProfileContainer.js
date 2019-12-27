import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../../redux/actions/userActions";
import UserDisplay from "./UserDisplay";
import UserNotFound from "./UserNotFound";
import Spinner from "../common/Spinner";
import CreateLinkButton from "./CreateLinkButton";

export function UserProfileContainer({ user, loadUser, loading }) {

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;
    if (user.userId !== userId) {
      loadUser(userId).catch(error => {
        console.log("Error loading user. " + error);
      });
    }
  }, []);



  return (
    <div className="ml-4">
      <h3 className="display-5">User Profile</h3>
      {loading ? (
        <Spinner />
      ) : (user && user.hasOwnProperty("userId") && user.userId !== "") ? (
        <div>
          <UserDisplay user={user} />
          <hr />
          <div>
            <CreateLinkButton label="Process Expenses" urlPath="/manage-expense" />
          </div>
          <hr />
          <div className="mt-5">
            <CreateLinkButton label="Create Sample Transactions" urlPath="/manage-sample-transactions" />
          </div>
        </div>
      ) : (
        <UserNotFound />
      )}
    </div>
  );
}

UserProfileContainer.propTypes = {
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContainer);
