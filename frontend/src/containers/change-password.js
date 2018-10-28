import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePassword, changePasswordClear } from '../actions';
import { Redirect } from 'react-router-dom';

class ChangePassword extends Component {
  password;

  onSubmit(event) {
    event.preventDefault();
    this.props.changePassword({
      password: this.password.value
    });
  }

  render() {
    if (this.props.success) {
      this.props.clear();
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Change Password</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            type="password"
            ref={node => (this.password = node)}
            required
          />
          <button type="submit">Change Password</button>
          {this.props.error ? <div>{this.props.error.message}</div> : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.changePassword.error,
  success: state.changePassword.success
});

const mapDispatchToProps = dispatch => {
  return {
    changePassword: data => dispatch(changePassword(data)),
    clear: () => dispatch(changePasswordClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
