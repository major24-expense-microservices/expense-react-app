import * as courseActions from '../../../../src/redux/actions/courseActions';
import * as types from '../../../../src/redux/actions/actionTypes';
import { courses } from '../../../../tools/mockData';

// Required for thunk
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// Testing Thunk..(async)
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions...', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load courses thunk', () => {
    it('Should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading the courses', () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

// Normal action creators
describe('CourseActions...', () => {
  it('Should create a CREATE_COURSE_SUCCESS action', () => {
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    // Act
    const action = courseActions.createCourseSuccess(course);
    // Assert
    expect(action).toEqual(expectedAction);
  });
});