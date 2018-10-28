import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import signUp from './sign-up';
import login from './login';
import changePassword from './change-password';

export default combineReducers({
  user,
  users,
  signUp,
  login,
  changePassword
});
