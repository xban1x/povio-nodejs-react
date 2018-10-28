const user = (state = {}, action) => {
  switch (action.type) {
    case 'ME_SUCCESS': {
      return { ...state, success: action.payload };
    }
    case 'ME_CLEAR': {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default user;
