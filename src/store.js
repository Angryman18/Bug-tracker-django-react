import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const getFromLocalStorage = () => {
  const getItem = localStorage.getItem("state");
  return JSON.parse(getItem) ?? {};
};

// change the reducer file only
const getInitialState = {
  BugReducer: getFromLocalStorage().BugReducer,
  FeatureReducer: getFromLocalStorage().FeatureReducer,
};

const store = createStore(
  rootReducer,
  getInitialState,
  composeWithDevTools(applyMiddleware(thunk))
);

const saveCurrentState = () => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
};

store.subscribe(() => {
  saveCurrentState();
});

export default store;
