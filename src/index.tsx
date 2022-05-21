import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./style";
import { BrowserRouter as Router } from "react-router-dom";

import { NotifyProvider } from "./stuffs/notify";

ReactDOM.render(
  <Router>
    <NotifyProvider>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </NotifyProvider>
  </Router>,
  document.getElementById("root")
);
