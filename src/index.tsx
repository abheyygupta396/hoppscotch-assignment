import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./store";

render(
  <Provider store={configureStore({})}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
