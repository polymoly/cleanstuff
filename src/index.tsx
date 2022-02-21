import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./style";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryClientProvider, QueryClient } from "react-query";
import { NotifyProvider } from "./stuffs/notify";

const client = new QueryClient();

ReactDOM.render(
  <Router>
    <NotifyProvider>
      <QueryClientProvider client={client}>
        <NotifyProvider>
          <App />
        </NotifyProvider>
      </QueryClientProvider>
    </NotifyProvider>
  </Router>,
  document.getElementById("root")
);
