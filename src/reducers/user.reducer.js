import { GET_ALL_USERS, GET_USER_FAILED } from "../actions/types";

const initialState = [];

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return [...action.payload];
    case GET_USER_FAILED:
        return []
    default:
      return state;
  }
};

export default UserReducer;
