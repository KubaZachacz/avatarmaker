import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import throttle from "lodash/throttle";
import { saveState } from "./utilis/localStorage";
import App from "./App";
import "./index.css";

const store = configureStore({
  reducer: rootReducer
});

// save state no more than once a 1sec
store.subscribe(
  throttle(() => {
    saveState({ ...store.getState() });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

