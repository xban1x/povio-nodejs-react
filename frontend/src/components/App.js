import React, { Component, Fragment } from 'react';
import './App.css';
import UserList from './../containers/user-list-container';
import Header from './../containers/header';
import SignUp from '../containers/sign-up';
import Login from '../containers/login';
import ChangePassword from '../containers/change-password';
import { Route } from 'react-router-dom';
import { Fragment } from 'react';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Route exact path="/" component={UserList} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/change-password" component={ChangePassword} />
      </Fragment>
    );
  }
}

export default App;
