import React, { Component } from "react";
import axios from "axios";

export default class ListUsersComponent extends Component {
  state = {
    users: [],
    hasError: false,
    api:"http://localhost:3001/api/users"
  };

  async componentDidMount() {
    console.log('uslo');
    try {
      const response = await axios.get(this.state.api);

      const { users } = response.data;

      this.setState({ users, hasError: false });
    } catch (err) {
      this.setState({ users: [], hasError: true });
    }
  }

  render() {
    const { users, hasError } = this.state;

    return hasError ? (
      <h1>ERROR OCCURED</h1>
    ) : (
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}
