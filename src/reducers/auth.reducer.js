import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = {};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { isLoggedIn: true, user: action.payload };
    case LOGIN_FAIL:
      return {};
    default:
      return state;
  }
};

export default AuthReducer;
