export const meSuccess = user => ({
  type: 'ME_SUCCESS',
  payload: user
});

export const meClear = () => ({
  type: 'ME_CLEAR'
});

export function me() {
  return (dispatch, getState) => {
    dispatch({ type: 'ME' });
    const state = getState();
    fetch(`http://localhost:1337/me`, {
      headers: {
        Authorization: 'Bearer ' + state.login.success
      },
      method: 'GET'
    })
      .then(async res => {
        if (res.status > 299) {
          throw await res.json();
        }
        const body = await res.json();
        dispatch(meSuccess(body));
        dispatch(fetchUsers());
      })
      .catch(err => {
        dispatch({ type: 'ME_ERROR' });
      });
  };
}

export const changePasswordSuccess = success => ({
  type: 'CHANGE_PASSWORD_SUCCESS',
  payload: success
});

export const changePasswordError = error => ({
  type: 'CHANGE_PASSWORD_ERROR',
  payload: error
});

export const changePasswordClear = () => ({
  type: 'CHANGE_PASSWORD_CLEAR'
});

export function changePassword() {
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_PASSWORD' });
    const state = getState();
    fetch(`http://localhost:1337/me/update-password`, {
      headers: {
        Authorization: 'Bearer ' + state.login.success
      },
      method: 'PUT'
    })
      .then(async res => {
        if (res.status > 299) {
          throw res.body;
        }
        const body = res.body;
        dispatch(changePasswordSuccess(body));
        dispatch(fetchUsers());
      })
      .catch(err => {
        dispatch(changePasswordError(err));
      });
  };
}

export const fetchUsersSuccess = users => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: users
});

export function fetchUsers() {
  return dispatch => {
    dispatch({ type: 'FETCHING_USERS' });
    fetch('http://localhost:1337/most-liked')
      .then(async res => dispatch(fetchUsersSuccess(await res.json())))
      .catch(err => {
        console.log(err);
      });
  };
}

export const signUpSuccess = success => ({
  type: 'SIGNUP_SUCCESS',
  payload: success
});

export const signUpError = error => ({
  type: 'SIGNUP_ERROR',
  payload: error
});

export const signUpClear = () => ({
  type: 'SIGNUP_CLEAR'
});

export function signUp(data) {
  return dispatch => {
    dispatch({ type: 'SIGNUP' });
    fetch('http://localhost:1337/signup', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(async res => {
        if (res.status > 299) {
          throw await res.json();
        }
        dispatch(signUpSuccess(await res.json()));
      })
      .catch(err => {
        dispatch(signUpError(err));
      });
  };
}

export const loginSuccess = success => ({
  type: 'LOGIN_SUCCESS',
  payload: success
});

export const loginError = error => ({
  type: 'LOGIN_ERROR',
  payload: error
});

export const loginClear = () => ({
  type: 'LOGIN_CLEAR'
});

export function login(data) {
  return dispatch => {
    dispatch({ type: 'LOGIN' });
    fetch('http://localhost:1337/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(async res => {
        if (res.status > 299) {
          throw await res.json();
        }
        const body = await res.json();
        dispatch(loginSuccess(body.token));
        dispatch(meSuccess(body.user));
      })
      .catch(err => {
        dispatch(loginError(err));
      });
  };
}

export function like(id) {
  return (dispatch, getState) => {
    dispatch({ type: 'LIKE' });
    const state = getState();
    fetch(`http://localhost:1337/user/${id}/like`, {
      headers: {
        Authorization: 'Bearer ' + state.login.success
      },
      method: 'PUT'
    })
      .then(async res => {
        if (res.status > 299) {
          throw await res.json();
        }
        dispatch({ type: 'LIKE_SUCCESS' });
        dispatch(me());
        dispatch(fetchUsers());
      })
      .catch(err => {
        dispatch({ type: 'LIKE_ERROR' });
      });
  };
}

export function unlike(id) {
  return (dispatch, getState) => {
    dispatch({ type: 'UNLIKE' });
    const state = getState();
    fetch(`http://localhost:1337/user/${id}/unlike`, {
      headers: {
        Authorization: 'Bearer ' + state.login.success
      },
      method: 'DELETE'
    })
      .then(async res => {
        if (res.status > 299) {
          throw await res.json();
        }
        dispatch({ type: 'UNLIKE_SUCCESS' });
        dispatch(me());
        dispatch(fetchUsers());
      })
      .catch(err => {
        dispatch({ type: 'UNLIKE_ERROR' });
      });
  };
}
