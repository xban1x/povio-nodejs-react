const signUp = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS': {
      return { ...state, success: action.payload };
    }
    case 'SIGNUP_ERROR': {
      return { ...state, error: action.payload };
    }
    case 'SIGNUP_CLEAR': {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default signUp;
