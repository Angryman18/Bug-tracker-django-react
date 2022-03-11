import { GET_BUGS } from "../actions/types";

const initialState = {};

const BugReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUGS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default BugReducer;
