import React from "react";
import CourseForm from "../../../../src/components/courses/CourseForm";
import { shallow, mount } from "enzyme";
import { courses, authors } from '../../../../tools/mockData';

const defaultProps = {
  authors: [],
  course: {},
  saving: false,
  errors: {},
  onSave: () => {},
  onChange: () => {}
};

function createCourseForm(args) {
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

describe("CourseForm (Enzyme)...", () => {
  it("Renders the form", () => {
    // Arrange & Act
    const wrapper = createCourseForm();
    // console.log(wrapper.html());
    // Assert
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h2").text()).toEqual("Add Course");
    expect(wrapper.find("button").text()).toEqual("Save");
  });

  describe('When Form is created with author props', () => {
    it('Renders select control with authors', () => {
      // Arrange
      const authors = [
        { id: 1, name: "Cory House" },
        { id: 2, name: "Scott Allen" }
      ];
      const props = { ...defaultProps, authors };
      const wrapper = mount(<CourseForm {...props}/>);
      // Act
      const selectAuthor = wrapper.find('select'); // Another way
      // console.log(selectAuthor.html());  // or selectAuthor.debug()
      // Assert
      expect(wrapper.find('option').length).toEqual(3);
      expect(selectAuthor.find('option').length).toEqual(3);
      expect(selectAuthor.html()).toContain('Cory House');
    });
  });

  describe('When Form is created with existing course', () => {
    const props = { ...defaultProps, authors, course: courses[0] };
    const wrapper = mount(<CourseForm {...props} />);
    it('Renders the form title', () => {
      expect(wrapper.find("h2").text()).toEqual("Edit Course");
    });

    it('Renders the course title', () => {
      expect(wrapper.find('input[name="title"]').html()).toContain('Securing React Apps with Auth0');
    });

    it('Renders the category', () => {
      expect(wrapper.find('input[name="category"]').html()).toContain('JavaScript');
    })
  });

  describe("When submit button is clicked", () => {
    it('Renders the button label to "Saving..."', () => {
      // Arrange
      const wrapper = createCourseForm({ saving: true });
      // Assert
      expect(wrapper.find("button").text()).toEqual("Saving...");
    });
  });

  describe("When submit button is clicked", () => {
    it('Triggers the save event', () => {
      // NOTE: button event does not trigger since the onSave is associated with FORM Element
      // So should trigger the form.submit event
      // Arrange
      const mockCallback = jest.fn();
      const wrapper = createCourseForm({ onSave: mockCallback });
      // Assert
      wrapper.find('form').simulate('submit');
      expect(mockCallback.mock.calls.length).toEqual(1);
    });

    // ** I Think this should be in MangeCoursePage to test....
    describe('And the title is empty', () => {
      // const wrapper = mount(<Counter />);
      // const spy = jest.spyOn(wrapper.instance(), 'handleClick');
      // // Act & Assert
      // wrapper.instance().handleClick({});
      // expect(spy).toHaveBeenCalled();
      // const mockCallback = jest.fn();
      // const wrapper = createCourseForm({ onSave: mockCallback });
      // const props = { ...defaultProps, onSave: mockCallback };
      // const wrapper = mount(<CourseForm {...props}/>);
      // // // Assert
      // wrapper.find('form').simulate('submit');
      // // wrapper.update();
      // console.log(wrapper.html())
      // // expect(mockCallback.mock.calls.length).toEqual(1);
    });

  });

});
