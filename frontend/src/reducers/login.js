const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return { ...state, success: action.payload };
    }
    case 'LOGIN_ERROR': {
      return { ...state, error: action.payload };
    }
    case 'LOGIN_CLEAR': {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default login;
