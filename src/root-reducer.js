import BugReducer from "./reducers/bug.reducer";
import FeatureReducer from "./reducers/feature.reducer";
import AuthReducer from "./reducers/auth.reducer";
import { combineReducers } from "redux";

const Reducer = combineReducers({
  BugReducer,
  FeatureReducer,
  AuthReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return {};
  }
  return Reducer(state, action);
};

export default rootReducer;
