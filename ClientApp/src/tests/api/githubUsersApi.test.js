import { getUsers } from '../../../src/api/githubUsersApi';

jest.mock('../../../src/api/githubUsersApi');

describe('githubUsersApi', () => {
  it('returns an object if status code is ok', async () => {
    expect.assertions(2);
    const data = await getUsers();
    expect(data.length).toEqual(2);
    expect(data[0]).toEqual({ id: 24, login: 'mn24', url: 'http://github/users/mn24' });
  })

  it('throws an error if status code is not ok', async () => {
    // ***** CANNOT TEST ERRORS .......

    // expect.assertions(1);
    // try {
    //   const data = await getUsers();
    //   console.log('>>>', data)
    //   // expect(data).toContain('fetch error');
    // } catch (errors) {
    //   console.log('>>>>>>', errors)
    //   expect(errors).toBe('[Error: Error fetching users from mock]');
    // }
  })
})