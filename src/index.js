import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById("root")
);
