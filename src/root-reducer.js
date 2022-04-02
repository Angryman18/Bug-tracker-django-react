import BugReducer from "./reducers/bug.reducer";
import FeatureReducer from "./reducers/feature.reducer";
import AuthReducer from "./reducers/auth.reducer";
import ProjectReducer from "./reducers/project.reducer";
import UserReducer from "./reducers/user.reducer";
import { combineReducers } from "redux";
import { LOGOUT } from "./actions/types";

const Reducer = combineReducers({
  // BugReducer,
  FeatureReducer,
  AuthReducer,
  ProjectReducer,
  UserReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return {};
  }
  return Reducer(state, action);
};

export default rootReducer;
