import authService from "../services/auth.service";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import jwt_decode from "jwt-decode";
import userService from "../services/user.service";

export const UserLogin = (Obj) => (dispatch) => {
  return authService
    .Login(Obj)
    .then((resp) => {
      const { user_id } = jwt_decode(resp.access);
      return userService
        .getUserInfo({ id: user_id })
        .then((res) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { ...res, user: { ...res.user, token: resp } },
          });
          return res;
        })
        .catch((err) => {
          Promise.reject(err)
        });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL });
      return Promise.reject(err);
    });
};
