import React from 'react';
import { mount } from 'enzyme';
import { user } from '../../../../tools/mockData';
import { UserProfileContainer } from '../../../components/userProfile/UserProfileContainer';
import { BrowserRouter as Router } from 'react-router-dom';

// NOTE: ANY TIME a link is used, SHOULD BE wrapped in <Router> as below...
function render(args) {
  let defaultProps = {
    user: {},
    loading: false,
    loadUser: jest.fn(),
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<Router> <UserProfileContainer {...props} /> </Router>);
}

describe('UserProfileContainer...', () => {
  let wrapper;
  describe('When rendering user container without user', () => {
    beforeEach(() => {
      wrapper = render();
    });

    it('Renders the title', () => {
      // console.log('>>>>', wrapper.debug());
      const el = wrapper.find('.display-5').first();
      expect(el.text()).toBe('User Profile');
    });

    it('Renders User not found component, when user is empty', () => {
      const el = wrapper.find('UserNotFound');
      expect(wrapper.exists('UserNotFound')).toBe(true);
      expect(el.find('.alert-danger').text()).toBe('User not found!');
      expect(el.text()).toBe('User not found!If you are an existing user, please click to LoginIf you are new a user, please create your profile.Create User');
    });
  });

  describe('When rendering user container with user', () => {
    let user = {userId: 'user24', firstName: 'Steve', lastName: 'Reynold', costCentre: 'CC100', email: 'steve@gmail.com' };
    let mock = {
      getItem: jest.fn('user1'),
      user: user
    };
    beforeEach(() => {
      wrapper = render(mock);
    });

    it('Renders UserDisplay Component', () => {
      expect(wrapper.exists('UserDisplay')).toBe(true);
    });

    it('Renders users information', () => {
      // console.log('>>>>', wrapper.debug());
      const ud = wrapper.find('UserDisplay');
      expect(ud.find('.display-5').text()).toEqual('Steve Reynold');
      expect(ud.text()).toContain(user.costCentre);
      expect(ud.text()).toContain(user.email);
    });

    it('Renders process expense and create sample trans buttons', () => {
      const linkBtns = wrapper.find('CreateLinkButton');
      expect(linkBtns.first().debug()).toContain('Process Expense');
      expect(linkBtns.debug()).toContain('Create Sample Transactions');
    });
  });


});