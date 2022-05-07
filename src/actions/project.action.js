import ProjectService from "@service/project.service";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_FAIL,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_FAIL,
} from "./types";

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

export const getAllComment = (id) => (dispatch) => {
  ProjectService.getAllProjectComment(id)
    .then((response) => {
      dispatch({
        type: GET_ALL_COMMENT,
        payload: response,
      });
      return Promise.resolve(response);
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_COMMENT_FAIL,
      });
      return Promise.reject(err);
    });
};
