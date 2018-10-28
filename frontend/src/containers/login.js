import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  username;
  password;

  onSubmit(event) {
    event.preventDefault();
    this.props.login({
      username: this.username.value,
      password: this.password.value
    });
  }

  render() {
    if (this.props.success) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text" ref={node => (this.username = node)} required />
          <input
            type="password"
            ref={node => (this.password = node)}
            required
          />
          <button type="submit">LOGIN</button>
          {this.props.error ? <div>{this.props.error.message}</div> : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.login.error,
  success: state.login.success
});

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
