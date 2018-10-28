import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const users = this.props.users;
    console.log(users);
    return (
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>Name: {user.username}</p>
            <p>Likes: {user.likes}</p>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({ users: state.users.list });

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
