import React from "react";
import GithubUsers from '../../../../src/components/sampleForm/GithubUsers';
import { shallow, mount } from "enzyme";

jest.mock('../../../../src/api/githubUsersApi');

describe('GithubUsers...', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GithubUsers />, {disableLifecycleMethods: true});
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render the page title', () => {
    expect(wrapper.find('.page-title').text()).toContain('Github Users')
  });

  describe('When component loads', () => {
    it('Loads mock data from __mocks__', async () => {
      // Arrange and Act
      const wrapper = await mount(<GithubUsers />);
      await wrapper.update();
      // Assert
      expect(wrapper.state('users').length).toEqual(2);
      // console.log(wrapper.find('tbody').childAt(0).debug())
      expect(wrapper.find('tbody').childAt(0).html()).toContain('<tr><td>mn24</td>');
    });

    it('Renders error', async () => {
      const wrapper = await shallow(<GithubUsers />);
      await wrapper.update();
      expect(wrapper.state('errors')).toEqual('Error fetching users from mock');
    })
  })

});
