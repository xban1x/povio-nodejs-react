import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginClear, meClear } from '../actions';

class Header extends Component {
  componentWillMount() {}

  render() {
    const user = this.props.user;
    return (
      <header>
        <button>
          <Link to="/">HOME</Link>
        </button>
        {user ? (
          <div>
            <button>
              <Link to="change-password">CHANGE PASSWORD</Link>
            </button>
            <button onClick={e => this.props.logout()}>LOG OUT</button>
          </div>
        ) : (
          <div>
            <button>
              <Link to="sign-up">SIGN UP</Link>
            </button>
            <button>
              <Link to="login">LOGIN</Link>
            </button>
          </div>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => ({ user: state.user.success });

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(meClear());
      dispatch(loginClear());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
