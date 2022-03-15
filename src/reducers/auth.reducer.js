import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  GET_USER_INFO,
  LOGOUT,
} from "../actions/types";

const initialState = {};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { isLoggedIn: true, user: action.payload };
    case LOGIN_FAIL:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default AuthReducer;
