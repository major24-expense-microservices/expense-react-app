import { createStore } from 'redux';
import rootReducer from '../../../src/redux/reducers';
import initialState from '../../../src/redux/reducers/initialState';
import * as courseActions from '../../../src/redux/actions/courseActions';

describe('Store', () => {
  it('Should handle creating courses', () => {
    // Arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'Clean Code'
    };

    // Act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    //
    const createdCourse = store.getState().courses[0];
    expect (createdCourse).toEqual(course);
  })

})