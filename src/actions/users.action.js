import userService from "../services/user.service";
import { GET_ALL_USERS, GET_USER_FAILED } from "./types";

export const getAllUserDetails = () => (dispatch) => {
  return userService
    .getAllUsers()
    .then((response) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((err) => {
      dispatch({type: GET_USER_FAILED});
      return Promise.reject(err)
    });
};
