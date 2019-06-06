import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import CreateUserForm from './components/CreateUserForm.jsx';
import App from './components/App.jsx';
import './style.css'

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Redirect exact from='/' to='/tasks' />
      <Route path='/login' component={LoginPage} />
      <Route path='/register' component={CreateUserForm} />
      <Route path='/tasks' component={App} />
    </Switch>
  </HashRouter>,
  document.getElementById('container')
);
