import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, like, unlike } from '../actions';

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  likeOrUnlike(user, userToLike) {
    if (!this.props.loggedIn) {
      return null;
    }
    if (this.props.user.id === userToLike.id) {
      return null;
    }
    const found = user.liked.findIndex(val => val.id === userToLike.id);
    return found > -1 ? (
      <button onClick={() => this.props.unlike(userToLike.id)}>Unlike</button>
    ) : (
      <button onClick={() => this.props.like(userToLike.id)}>Like</button>
    );
  }

  render() {
    const users = this.props.users;
    return (
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>Name: {user.username}</p>
            <p>Likes: {user.likes}</p>
            {this.likeOrUnlike(this.props.user, user)}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loggedIn: !!state.user.success,
  user: state.user.success
});

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    like: id => dispatch(like(id)),
    unlike: id => dispatch(unlike(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
