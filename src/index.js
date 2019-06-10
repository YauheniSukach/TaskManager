import React from "react";
import ReactDOM from "react-dom";

import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import CreateUserForm from "./components/CreateUserForm.jsx";
import App from "./components/App.jsx";
import "./style.css";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/login" component={LoginPage} />
      <Route path="/dashboard" component={App} />
      <Route path="/register" component={CreateUserForm} />
    </Switch>
  </HashRouter>,
  document.getElementById("container")
);
