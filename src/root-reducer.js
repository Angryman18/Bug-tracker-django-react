import BugReducer from "./reducers/bug.reducer";
import FeatureReducer from "./reducers/feature.reducer";
import AuthReducer from "./reducers/auth.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  BugReducer,
  FeatureReducer,
  AuthReducer,
});

export default rootReducer;
