import { GET_USER_SPECEFIC_BUGS } from "./types";
import manageService from "@service/manage.service";

export const getUserSpeceficBugs = () => (dispatch) => {
  return manageService
    .getUserBugs()
    .then((res) => {
      dispatch({
        type: GET_USER_SPECEFIC_BUGS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_SPECEFIC_BUGS_FAIL,
      });
      return err;
    });
};
