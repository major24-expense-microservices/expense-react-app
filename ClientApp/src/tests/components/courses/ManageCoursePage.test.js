import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../../tools/mockData';
import { ManageCoursePage } from '../../../components/courses/ManageCoursePage';



function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

describe('ManageCoursePage...', () => {
  const wrapper = render();
  describe('When submitting a form', () => {
    it('Sets error when title field is empty', () => {
      wrapper.find('form').simulate('submit');
      const error = wrapper.find('.alert').first();
      expect(error.text()).toBe('Title is required');
    })
  });
});
