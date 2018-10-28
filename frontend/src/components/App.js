import React, { Component } from 'react';
import './App.css';
import UserList from './../containers/user-list';
import Header from './../containers/header';
import SignUp from '../containers/sign-up';
import Login from '../containers/login';
import ChangePassword from '../containers/change-password';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={UserList} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/change-password" component={ChangePassword} />
        </div>
      </Router>
    );
  }
}

export default App;
