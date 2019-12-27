import React from "react";
import { getUsers, getUser } from '../../../src/api/githubUsersApi';

class GithubUsers extends React.Component {
  constructor() {
    super();
  }
  state = {
    users: [],
    user: {},
    errors: ''
  };

  errorsStyles = {
    color: 'red'
  }

  async loadUsers() {
    try{
      const data = await getUsers();
      this.setState(prevState => {
        return { ...prevState, users: data };
      });
    } catch(error) {
      this.setState(prevState => {
        return { ...prevState, errors: error.message };
      });
    }
  }

  async showUser(userId) {
    console.log('getting user from api...', userId);
    // Clear the state before pulling new rec
    this.setState(prevState => {
      return { ...prevState, user: {} };
    });
    // Now get the record
    try {
      const data = await getUser(userId);
      this.setState(prevState => {
        return { ...prevState, user: data };
      })
    } catch (error) {
      console.log('Error getting individual user data');
      this.setState(prevState => {
        return { ...prevState, errors: error.message };
      });
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  isError() {
    const errors = this.state.errors;
    if (errors) {
      return (
        <div style={this.errorsStyles}>Error: {errors}</div>
      )
    }
  }

  render() {
    const makeUserList = () => {
      if (this.state.users.length > 0) {
        let list = this.state.users.map(user => {
          return (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>{user.id}</td>
              <td>{user.url}</td>
              <td>
                <button onClick={() => this.showUser(user.id)}>show</button>
              </td>
            </tr>
          )
        });
        return <tbody>{list}</tbody>
      } else {
        return <tbody></tbody>
      }
    }
    return (
      <div>
        <p className='page-title'>Github Users (for api testing)</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Login</th>
                <th>Id</th>
                <th>Url</th>
                <th>Show User</th>
              </tr>
            </thead>
            {makeUserList()}
          </table>
        </div>
        <hr />
        <div>
          <p>Selected User</p>
          <p>Getting each user from API to test different API call by using params...</p>
          <p>Selecting an invalid user...
            <button onClick={() => this.showUser(-10)}>show</button>
          </p>
          <div>
            {JSON.stringify(this.state.user)}
          </div>
        </div>
        <hr />
        {this.isError()}
        <hr />
        Debug:
        {/* {JSON.stringify(this.state.users)} */}
      </div>
    );
  }
}

export default GithubUsers;
