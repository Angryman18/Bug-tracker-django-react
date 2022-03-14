import ReactDOM from "react-dom";
import App from "./App";
import React from "react";
import "./index.css";
import registerServiceWorker from "./serviceWorkerRegistration";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
