import React from "react";
import PropTypes from "prop-types";

const ShowMessage = ({ ...props }) => {
  return (
    <div>
      {props.location.state.message}
    </div>
  );
};

ShowMessage.propTypes = {
  props: PropTypes.object,
  location: PropTypes.object,
  state: PropTypes.object
}

export default ShowMessage;
