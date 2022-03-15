import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { LOGOUT } from "./actions/types";

const getFromLocalStorage = () => {
  const getItem = localStorage.getItem("state");
  return JSON.parse(getItem) ?? {};
};

let initialState = getFromLocalStorage();
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const saveCurrentState = () => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
};

store.subscribe(() => {
  saveCurrentState();
});

// unsubscribe();

export default store;
