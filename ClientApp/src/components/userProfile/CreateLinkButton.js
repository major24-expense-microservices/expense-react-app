import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CreateLinkButton = ({urlPath, label}) => {
  return (
    <Link to={urlPath}>
      <button type="button" className="btn btn-primary">{label}</button>
    </Link>
  );
};

CreateLinkButton.propTypes = {
  urlPath: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default CreateLinkButton;