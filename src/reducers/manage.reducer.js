import {
  GET_USER_SPECEFIC_BUGS,
  GET_USER_SPECEFIC_BUGS_FAIL,
} from "@actions/types";

const initialState = [];

const ManageRedcuer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SPECEFIC_BUGS:
      return [...action.payload?.data];
    case GET_USER_SPECEFIC_BUGS_FAIL:
      return [];
    default:
      return state;
  }
};

export default ManageRedcuer;
