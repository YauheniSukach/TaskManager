import React, { Component } from 'react';
import propTypes from 'prop-types';

import UsersStore from '../stores/UsersStore';
import UsersActions from '../actions/UsersActions';
import AuthenticationActions from '../actions/AuthenticationActions';
import PasswordMask from 'react-password-mask';

import './login-page.scss';

function getStateFromFlux() {
  return {
    users: UsersStore.getUsers(),
  };
}

export default class LoginPage extends Component {
  state = {
    login: '',
    password: '',
    validate: true,
    open: false,
    users: {},
  };

  componentWillMount() {
    UsersActions.loadUsers();
  }

  componentDidMount() {
    UsersStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UsersStore.removeChangeListener(this._onChange);
  }

  loginChange = (event) => {
    this.setState({ login: event.target.value });
  }

  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  }


  _onChange = () => {
    this.setState({ users: getStateFromFlux() });
  }

  loginUser = () => {
    const user = {
      login: this.state.login,
      password: this.state.password,
    };
    const redirect = this.props.history.push;

    AuthenticationActions.login(user, redirect);

    this.setState({
      login: '',
      password: '',
    });
  }

  createUserForm = () => {
    this.props.history.push('/register');
  }

  render() {
    const { validate } = this.state;
    return (
      <div className="login-page">
        <h2 className='app-name'>TaskManager</h2>
        {!validate && (<div className='login-page-form__validate'>Incorrect login or password!</div>)}
        <div className='login-page-form'>
          <input
            type='text'
            className='login-page__login'
            placeholder='Enter your login'
            value={this.state.login}
            onChange={this.loginChange}
          />
          <PasswordMask
            id="password"
            name="password"
            inputClassName='login-page__password'
            className='password-container'
            placeholder='Enter your password'
            value={this.state.password}
            onChange={this.passwordChange.bind(this)}
            useVendorStyles={false}
          />
          <div className='login-page__footer'>
            <button
              className='login-page__button'
              disabled={!this.state.login}
              onClick={this.loginUser}
            >
              Log in
            </button>
            <button
              className='login-page__button'
              onClick={this.createUserForm}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
};
