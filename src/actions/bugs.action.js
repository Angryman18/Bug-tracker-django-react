import BugService from "../services/bug.services";
import { GET_BUGS } from "./types";

const saveAllBugs = () => (dispatch) => {
  return BugService.getAllBugs()
    .then((res) => {
      dispatch({ type: GET_BUGS, payload: res.data });
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export default saveAllBugs;
