import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./style";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";
import { NotifyProvider } from "./stuffs/notifications";

const client = new QueryClient();

ReactDOM.render(
  <Router>
    <QueryClientProvider client={client}>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </QueryClientProvider>
  </Router>,
  document.getElementById("root")
);
