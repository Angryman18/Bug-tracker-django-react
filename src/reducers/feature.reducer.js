import { GET_ALL_FEATURES, GET_ALL_FEATURE_FAIL } from "../actions/types";

const initialState = [];

const FeatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FEATURES:
      return [...action.payload];
    case GET_ALL_FEATURE_FAIL:
      return { data: [] };
    default:
      return state;
  }
};

export default FeatureReducer;
