export const getUsers = jest.fn()
  .mockImplementationOnce(() => (
    [
      { id: 24, login: 'mn24', url: 'http://github/users/mn24' },
      { id: 33, login: 'cd33', url: 'http://github/users/cd33' }
    ]
  ))
  .mockImplementationOnce(() => {
    throw (new Error('Error fetching users from mock'))
  })
  