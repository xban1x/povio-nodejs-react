import React, { Component } from 'react';
import User from './user';

class UserList extends Component {
  render() {
    return (
      <ul>
        {this.props.users.map(user => (
          <User key={user.id} user={user} onClick={this.props.onClick} />
        ))}
      </ul>
    );
  }
}

export default UserList;
