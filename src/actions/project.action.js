import ProjectService from "../services/project.service";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_FAIL } from "./types";

export const retrieveAllProject = () => (dispatch) => {
  ProjectService.getAllProjects()
    .then((response) => {
      dispatch({
        type: GET_ALL_PROJECT,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_PROJECT_FAIL,
      });
      return Promise.reject(err);
    });
};
