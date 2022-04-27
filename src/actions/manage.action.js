import {
  GET_USER_SPECEFIC_CONTENTS_FAIL,
  GET_USER_SPECEFIC_CONTENTS,
} from "./types";
import manageService from "@service/manage.service";

export const getUserSpeceficContent = () => (dispatch) => {
  return manageService
    .getUserSpeceficContent()
    .then((res) => {
      dispatch({
        type: GET_USER_SPECEFIC_CONTENTS,
        payload: res,
      });
      return res;
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_SPECEFIC_CONTENTS_FAIL,
      });
      return err;
    });
};
