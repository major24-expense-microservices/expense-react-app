import React from "react";
import Counter from '../../../../src/components/sampleForm/Counter';
import { shallow, mount } from "enzyme";

describe('Counter Component', () => {
  it('Renders the component', () => {
    const wrapper = mount(<Counter />);
    // Assert
    expect(wrapper.html()).toContain('div');
    // Expect default counter value
    expect(wrapper.find('#result').text()).toEqual('Clicks: 0');
  });

  describe('When increment button is clicked', () => {
    it('Renders the incremented value', () => {
      const wrapper = mount(<Counter />);
      // Act & Assert
      wrapper.find('#btn1').simulate('click');
      expect(wrapper.find('#result').text()).toEqual('Clicks: 1');
      // Click second time
      wrapper.find('#btn1').simulate('click');
      expect(wrapper.find('#result').text()).toEqual('Clicks: 2');
    });

    it('Calls the handle function', () => {
      const wrapper = mount(<Counter />);
      const spy = jest.spyOn(wrapper.instance(), 'handleClick');
      // Act & Assert
      wrapper.instance().handleClick({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('When async button is clicked', () => {
    it('Renders the value after some time', () => {
      // Use Jest Timers to tigger setTimeout fns
      jest.useFakeTimers();
      const wrapper = mount(<Counter />);
      wrapper.find('#btn2').simulate('click');
      
      jest.runAllTimers();
      expect(wrapper.find('#result').text()).toEqual('Clicks: 1');
      jest.useRealTimers();
    });
  });



});