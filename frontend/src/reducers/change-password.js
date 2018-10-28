const changePassword = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD_SUCCESS': {
      return { ...state, success: action.payload };
    }
    case 'CHANGE_PASSWORD_ERROR': {
      return { ...state, error: action.payload };
    }
    case 'CHANGE_PASSWORD_CLEAR': {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default changePassword;
