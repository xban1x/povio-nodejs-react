import React, { Component } from 'react';

class User extends Component {
  render() {
    const user = this.props.user;
    return (
      <li>
        <p>Name: {user.username}</p>
        <p>Likes: {user.likes}</p>
        {user.action ? (
          <button onClick={e => this.props.onClick(user.id)}>
            {user.action}
          </button>
        ) : null}
      </li>
    );
  }
}

export default User;
