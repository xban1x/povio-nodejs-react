import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from './../actions';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
  username;
  password;

  onSubmit(event) {
    event.preventDefault();
    this.props.signUp({
      username: this.username.value,
      password: this.password.value
    });
  }

  render() {
    if (this.props.success) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text" ref={node => (this.username = node)} required />
          <input
            type="password"
            ref={node => (this.password = node)}
            required
          />
          <button type="submit">SIGN UP</button>
          {this.props.error ? <div>{this.props.error.message}</div> : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.signUp.error,
  success: state.signUp.success
});

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(signUp(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
