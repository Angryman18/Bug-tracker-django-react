import { GET_ALL_PROJECT } from "../actions/types";

const initialState = {};

const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT:
      return { data:action.payload, count: action.payload.length };
    default:
      return state;
  }
};

export default ProjectReducer;
