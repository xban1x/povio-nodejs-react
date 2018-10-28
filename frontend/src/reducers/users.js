const user = (state = { list: [] }, action) => {
  switch (action.type) {
    case 'FETCH_USERS_SUCCESS': {
      return { ...state, list: action.payload };
    }
    case 'LOGIN': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default user;
