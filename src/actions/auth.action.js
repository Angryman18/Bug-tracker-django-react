import authService from "../services/auth.service";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
} from "./types";
import userService from "../services/user.service";

export const UserLogin = (Obj) => (dispatch) => {
  return authService
    .Login(Obj)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      return Promise.reject(err);
    });
};

export const GetLoggedInUserInfo = (id, token) => (dispatch) => {
  return userService
    .getUserInfo({ id: id })
    .then((res) => {
      console.log(res);
      const modifiedResp = { ...res, user: { ...res.user, token } };
      dispatch({ type: LOGIN_SUCCESS, payload: modifiedResp });
      return res;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      return Promise.reject(err);
    });
};

export const UserSignup = (Obj) => (dispatch) => {
  return authService
    .Signup(Obj)
    .then((resp) => {
      dispatch({ type: SIGNUP_SUCCESS, payload: resp });
      return resp;
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_FAIL });
      return Promise.reject(err);
    });
};
