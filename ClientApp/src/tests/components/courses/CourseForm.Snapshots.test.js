import React from 'react';
import CourseForm from '../../../components/courses/CourseForm';
import renderer from 'react-test-renderer';
import { courses, authors } from '../../../../tools/mockData';

describe('CourseForm...', () => {
  describe('When submitting a course', () => {
    it ('Renders the submit button with "Saving..." label', () => {
      const wrapper = renderer.create(
      <CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        saving
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('When rendering the course form', () => {
    it ('Renders the submit button with "Save" label', () => {
      const wrapper = renderer.create(
      <CourseForm
        course={courses[0]}
        authors={authors}
        onSave={jest.fn()}
        onChange={jest.fn()}
        saving={false}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

});
