import React from 'react';
import PropTypes from 'prop-types';

class ControlledForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      preferredDelivery: '',
      deliveryCharge: '',
      country: '',
      errors: {}
    }
  }

  handleChangeTitle(event) {
    const { value } = event.target; // <-- moved outside asynchronous context
    this.setState((prevState) => {
      return { ...prevState, title: value }
    });
  }

  handleChangeDescription(event) {
    const { value } = event.target;
    this.setState((prevState) => {
      return { ...prevState, description: value }
    });
  }

  handleChangeCountry(event) {
    const { value } = event.target;
    this.setState((prevState) => {
      return { ...prevState,
        country: value }
    });
  }

  handlePreferredDelivery(event) {
    const deliveryType = event.target.value;
    let deliveryCharge = '0.00' // default
    if (deliveryType === 'FED_EX') { deliveryCharge = '7.99' }
    if (deliveryType === 'UPS') { deliveryCharge = '14.99' }

    this.setState((prevState) => {
      return { ...prevState,
        preferredDelivery: deliveryType,
        deliveryCharge: deliveryCharge }
    });
  }

  isFormValid() {
    const { title, description } = this.state;
    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!description) errors.description = 'Description is required';

    this.setState((prevState) => {
      return { ...prevState, errors: errors }
    });
    return Object.keys(errors).length === 0;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.isFormValid();
  }

  showDeliveryCharge = () => {
    if (this.state.deliveryCharge !== '') {
      return (
        <div id="delivery-charge">
          Delivery Charge: {this.state.deliveryCharge}
        </div>
      )
    }
  }


  render() {
    const { countryOptions } = this.props;
    const selCountry = this.state.country;
    let provincesList = [];
    if (selCountry !== '') {
      let provList = countryOptions.find(c => {
        return c.value === selCountry;
      });
      if (provList) {
        provincesList = provList.provinces.map((prov) => {
          return (<option key={prov} value={prov}>{prov}</option>)
        });
      }
    }

    return (
      <div>
        <form className='controlled-form' onSubmit={(event) => this.handleSubmit(event)}>
          <div id="form-name">{this.props.formName}</div>
          <div>
            <input type="text" id="title" value={this.state.title} onChange={(event) => this.handleChangeTitle(event)} />
            <label htmlFor="title">Title: </label>
            {this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}
          </div>
          <div>
            <input type="text" id="description" value={this.state.description} onChange={(event) => this.handleChangeDescription(event)} />
            <label htmlFor="description">Description: </label>
            {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}
          </div>
          <div>
            <label htmlFor="preferredDelivery">Preferred Delivery</label>
            <div id="radio-group">
              <input type="radio" name="preferred-delivery" onClick={(event) => this.handlePreferredDelivery(event)} value="STD_MAIL" />Standard Mail {" | "}
              <input type="radio" name="preferred-delivery" onClick={(event) => this.handlePreferredDelivery(event)} value="FED_EX" />Fed Ex {" | "}
              <input type="radio" name="preferred-delivery" onClick={(event) => this.handlePreferredDelivery(event)} value="UPS" />UPS
            </div>
            {this.showDeliveryCharge()}
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <select id="country" onChange={(event) => this.handleChangeCountry(event)}>
              <option value="">Select</option>
              {this.props.countryOptions.map(option => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label htmlFor="province">Province</label>
            <select id="province">
              <option value="">Select</option>
                {provincesList}
            </select>
          </div>

          <div>
            <button type="submit" >Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

ControlledForm.propTypes = {
  formName: PropTypes.string.isRequired,
  countryOptions: PropTypes.array.isRequired
};

export default ControlledForm;
