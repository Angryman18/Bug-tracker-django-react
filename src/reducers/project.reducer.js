import {
  GET_ALL_PROJECT,
  GET_ALL_COMMENT,
  GET_ALL_COMMENT_FAIL,
  ADD_LIKE_QUERY,
  ADD_LIKE_QUERY_FAIL,
} from "../actions/types";

const initialState = {};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return { ...state, data: action.payload, count: action.payload.length };
    case GET_ALL_COMMENT:
      return { ...state, comment: action.payload };
    case GET_ALL_COMMENT_FAIL:
      return { ...state, comment: [] };
    case ADD_LIKE_QUERY:
      const getProjectIndex = state.data.findIndex(b => b.id === action.payload.id)
      const getProject = state.data[getProjectIndex]
      if (!getProject.liked) {
        getProject.likes = getProject.likes + 1
        getProject.liked = true
      } else {
        getProject.likes = getProject.likes - 1
        getProject.liked = false
      }
      const newData = [...state.data]
      newData[getProjectIndex] = getProject
      return { ...state, data: newData };
    default:
      return state;
  }
};

export default ProjectReducer;
