import React from "react";
import ControlledForm from '../../../components/sampleForm/ControlledForm';
import { shallow, mount } from "enzyme";

describe('ControlledForm...', () => {
  let wrapper;
  const defaultProps = {
    formName: 'My Form',
    mockSubmit: jest.fn(),
    countryOptions:[
      {value: 'USA', text: 'United States', provinces: ['New York', 'California']},
      {value: 'CA', text: 'Canada', provinces: ['Ontario', 'Alberta', 'British Columbia', 'Quebec']}
    ],
  };

  const defaultState = {
    title: '',
    description: '',
    preferredDelivery: '',
    deliveryCharge: '',
    country: '',
    errors: {}
  };

  describe('When the form is created', () => {
    beforeEach(() => {
      wrapper = mount(<ControlledForm { ...defaultProps } />);
    });

    it('Renders the component', () => {
      // Assert
      expect(wrapper.html()).toContain('div');
      expect(wrapper.html()).toContain('form');
    });

    it('Renders the form name props', () => {
      expect(wrapper.find('#form-name').text()).toBe('My Form');
    });

    it('Renders the text input fields for title and description', () => {
      expect(wrapper.find('input[type="text"]').length).toBe(2);
    });

    it('Renders the radio input fields for preferred delivery option', () => {
      expect(wrapper.find('input[type="radio"]').length).toBe(3);
    });

    it('Renders selection controls', () => {
      expect(wrapper.find('select').length).toBe(2);
    });

    it('Renders country selection field with data', () => {
      expect(wrapper.find('#country').children().length).toBe(3);
      expect(wrapper.find('#country').childAt(1).text()).toBe('United States');
    });

    it('Renders province selection field as empty', () => {
      expect(wrapper.find('#province').children().length).toBe(1);
      expect(wrapper.find('#province').childAt(0).text()).toBe('Select');
    });

    describe('And contains the state and props to track form changes', () => {
      it('Should match default state', () => {
        // console.log(wrapper.state());
        expect(wrapper.state()).toEqual(defaultState);
      });

      it('Should match props passed in', () => {
        expect(wrapper.props()).toEqual(defaultProps);
      });
    });

  });

  describe('When the form is being updated', () => {
    beforeEach(() => {
      wrapper = mount(<ControlledForm { ...defaultProps } />);
    });

    describe('And title is changed', () => {
      it('Should call setState on title', () => {
        const mockEvent = {
          target: {
            name: 'title',
            value: 'my new title'
          }
        };
        const expected = { ...defaultState, title: 'my new title' };

        wrapper.find('#title').simulate('change', mockEvent);
        expect(wrapper.state()).toEqual(expected);
      });
    });

    describe('And description is changed', () => {
      it('Should call setState on description', () => {
        const mockEvent = {
          target: {
            name: 'description',
            value: 'my new description'
          }
        };
        const expected = { ...defaultState, description: 'my new description' };

        wrapper.find('#description').simulate('change', mockEvent);
        expect(wrapper.state()).toEqual(expected);
      });
    });

    describe('And preferred delivery, standard mail is checked', () => {
      // Arrange
      const expected = { ...defaultState,
        preferredDelivery: 'STD_MAIL',
        deliveryCharge: '0.00'
      };
      // Act
      beforeEach(() => {
        wrapper.find('#radio-group').childAt(0).simulate('click');
      });

      it('Sets the state preferredDelivery and charge to STD_MAIL', () => {
        // Assert
        expect(wrapper.state('preferredDelivery')).toEqual('STD_MAIL');
        expect(wrapper.state('deliveryCharge')).toEqual('0.00');
        expect(wrapper.state()).toEqual(expected);
      });

      it('Renders the delivery charge for standard mail', () => {
        // Assert
        expect(wrapper.find('#delivery-charge').text()).toBe('Delivery Charge: 0.00');
      });
    });

    describe('And preferred delivery, federal express is checked', () => {
      // Arrange
      const expected = { ...defaultState,
        preferredDelivery: 'FED_EX',
        deliveryCharge: '7.99'
      };
      // Act
      beforeEach(() => {
        wrapper.find('#radio-group').childAt(1).simulate('click');
      });

      it('Sets the state preferredDelivery to FED_EX', () => {
        // Assert
        expect(wrapper.state('preferredDelivery')).toEqual('FED_EX');
        expect(wrapper.state('deliveryCharge')).toEqual('7.99');
        expect(wrapper.state()).toEqual(expected);
      });

      it('Renders the delivery charge for fed ex', () => {
        // Assert
        expect(wrapper.find('#delivery-charge').text()).toBe('Delivery Charge: 7.99');
      });
    });

    describe('And preferred delivery, united parcel services is checked', () => {
      // Arrange
      const expected = { ...defaultState,
        preferredDelivery: 'UPS',
        deliveryCharge: '14.99'
      };
      // Act
      beforeEach(() => {
        wrapper.find('#radio-group').childAt(2).simulate('click');
      });

      it('Sets the state preferredDelivery to UPS', () => {
        // Assert
        expect(wrapper.state('preferredDelivery')).toEqual('UPS');
        expect(wrapper.state('deliveryCharge')).toEqual('14.99');
        expect(wrapper.state()).toEqual(expected);
      });

      it('Renders the delivery charge for ups', () => {
        // Assert
        expect(wrapper.find('#delivery-charge').text()).toBe('Delivery Charge: 14.99');
      });
    });

    describe('And preferred delivery option is NOT selected', () => {
      it('Should NOT render the delivery charge', () => {
        // Assert
        expect(wrapper.find('#delivery-charge').exists()).toBe(false);
      });
    });
  });

  describe('When the form is being submitted', () => {
    beforeEach(() => {
      wrapper = mount(<ControlledForm { ...defaultProps } />);
    });

    it('Should mock calls to preventDefault and isFormValid functions', () => {
      const mockPreventDefault = jest.fn();
      const mockEvent = {
        preventDefault: mockPreventDefault
      };
      // mock instance method
      wrapper.instance().isFormValid = jest.fn();
      // Act
      wrapper.instance().handleSubmit(mockEvent);
      // Assert
      expect(mockPreventDefault).toHaveBeenCalled();
      expect(wrapper.instance().isFormValid).toHaveBeenCalled();
    });

    it('Should render inline errors if title and description is empty', () => {
      const mockPreventDefault = jest.fn();
      const mockEvent = {
        preventDefault: mockPreventDefault
      };
      // Act
      wrapper.instance().handleSubmit(mockEvent);
      wrapper.update();
      // Assert
      expect(wrapper.find('.alert-danger').length).toEqual(2);
      expect(wrapper.find('.alert-danger').debug()).toContain('Title is required');
      expect(wrapper.find('.alert-danger').debug()).toContain('Description is required');
    });
  });

  // State changes via instance method
  describe('When isFormValid function is called', () => {
    beforeEach(() => {
      wrapper = mount(<ControlledForm { ...defaultProps } />);
    });

    it('Should have no errors in state, if title and description is populated', () => {
      // Arrange
      wrapper.setState({ title: 'some title', description: 'some desc'});
      // Act
      wrapper.instance().isFormValid();
      // Assert
      // console.log(wrapper.state('errors')) // will return a perticular state
      expect(wrapper.state('errors')).toEqual({});
    });

    it('Should populate title error in state, when title is empty', () => {
      // Arrange
      wrapper.setState({ title: '', description: 'some desc' });
      const expected = {
        title: 'Title is required'
      }
      // Act
      wrapper.instance().isFormValid();
      // Assert
      expect(wrapper.state('errors')).toEqual(expected);
    });

    it('Should populate description error in state, when description is empty', () => {
      // Arrange
      wrapper.setState({ title: 'some title', description: '' });
      const expected = {
        description: 'Description is required'
      }
      // Act
      wrapper.instance().isFormValid();
      // Assert
      expect(wrapper.state('errors')).toEqual(expected);
    });
  });

  describe('When the forms Country field is being updated', () => {
    beforeEach(() => {
      wrapper = mount(<ControlledForm { ...defaultProps } />);
    });

    it('Should set state country to selected country USA', () => {
      // Arrange
      const expected = { ...defaultState,
        country: 'USA'
      };
      wrapper.find('#country').childAt(1).simulate('change'); // 1=USA
      // Assert
      expect(wrapper.state('country')).toEqual('USA');
      expect(wrapper.state()).toEqual(expected);
    });

    it('Should render provinces for selected country USA', () => {
      wrapper.find('#country').childAt(1).simulate('change'); // 1=USA
      expect(wrapper.find('#province').children().length).toEqual(3);
      expect(wrapper.find('#province').childAt(1).text()).toEqual('New York')
    });

    it('Should render provinces for selected country Canada', () => {
      wrapper.find('#country').childAt(2).simulate('change'); // Canada
      expect(wrapper.find('#province').children().length).toEqual(5);
      expect(wrapper.find('#province').childAt(2).text()).toEqual('Alberta')
    });

  });




});