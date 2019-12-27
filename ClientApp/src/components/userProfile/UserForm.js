import React from "react";
import PropTypes from "prop-types";
import SelectInput from "../common/SelectInput";

const UserForm = ({
  user,
  onChange,
  onSave,
  costCentre,
  saving = false,
  errors = {}
}) => {

  return (
    <div className="ml-4">
    <form onSubmit={onSave}>
      <h3 className="display-5">{user.userId ? "Edit" : "Add"} User</h3>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
          <div>
              <div><label htmlFor="userId">User Id</label></div>
              <input type="text" id="userId" name="userId" value={user.userId} onChange={onChange} className="form-control" />
              {errors.userId && <div className="alert alert-danger">{errors.userId}</div>}
          </div>
          <div>
            <div><label htmlFor="password">Password</label></div>
            <input type="password" id="password" name="password" value={user.password} onChange={onChange} className="form-control" />
            {errors.password && <div className="alert alert-danger">{errors.password}</div>}
          </div>
          <div>
            <div><label htmlFor="firstName">First Name</label></div>
            <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={onChange} className="form-control" />
            {errors.firstName && <div className="alert alert-danger">{errors.firstName}</div>}
          </div>
          <div>
            <div><label htmlFor="lastName">Last Name</label></div>
            <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={onChange} className="form-control" />
            {errors.lastName && <div className="alert alert-danger">{errors.lastName}</div>}
          </div>
          <div>
            <div><label htmlFor="email">Email</label></div>
            <input type="text" id="email" name="email" value={user.email} onChange={onChange} className="form-control" />
            {errors.email && <div className="alert alert-danger">{errors.email}</div>}
          </div>
          <div>
            <SelectInput
              name="costCentre"
              label="Cost Centre"
              options={costCentre}
              onChange={onChange} />
            {errors.costCentre && <div className="alert alert-danger">{errors.costCentre}</div>}
          </div>

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  costCentre: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default UserForm;
