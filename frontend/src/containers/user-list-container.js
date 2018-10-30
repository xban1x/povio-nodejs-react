import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, like, unlike } from '../actions';
import UserList from '../components/user-list';

class UserListContainer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  getAction(userToLikeId) {
    if (!this.props.loggedIn) {
      return null;
    }
    if (this.props.user.id === userToLikeId) {
      return null;
    }
    const found = this.props.user.liked.findIndex(
      val => val.id === userToLikeId
    );
    return found > -1 ? 'Unlike' : 'Like';
  }

  onClick(id) {
    const action = this.getAction(id);
    if (action === 'Like') {
      this.props.like(id);
    } else if (action === 'Unlike') {
      this.props.unlike(id);
    }
  }

  render() {
    const users = this.props.users.map(val => {
      return { ...val, action: this.getAction(val.id) };
    });
    return <UserList users={users} onClick={this.onClick.bind(this)} />;
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
)(UserListContainer);
