import BugReducer from "./reducers/bug.reducer";
import FeatureReducer from "./reducers/feature.reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({ BugReducer, FeatureReducer });

export default rootReducer;
