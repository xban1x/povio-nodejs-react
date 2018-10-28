export function fetchUser(id) {
  return fetch('http://localhost:1337/user/' + id)
    .then(res => {})
    .catch(err => {});
}

export const fetchUsersSuccess = users => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: users
});

export function fetchUsers() {
  return dispatch =>
    fetch('http://localhost:1337/most-liked')
      .then(async res => dispatch(fetchUsersSuccess(await res.json())))
      .catch(err => {
        dispatch();
      });
}
