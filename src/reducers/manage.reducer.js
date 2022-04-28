import {
  GET_USER_SPECEFIC_CONTENTS_FAIL,
  GET_USER_SPECEFIC_CONTENTS,
} from "@actions/types";

const initialState = {};

const ManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SPECEFIC_CONTENTS:
      return {...action.payload};
    case GET_USER_SPECEFIC_CONTENTS_FAIL:
      return {};
    default:
      return state;
  }
};

export default ManageReducer;
