import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(reducers)}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
