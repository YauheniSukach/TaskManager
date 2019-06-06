import React, { Component } from 'react';
import PasswordMask from 'react-password-mask';
import Dropdown from 'react-dropdown'
import UsersActions from '../actions/UsersActions';
import './create-user-form.scss';

export default class CreateUserForm extends Component {
  state = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    department: 'Development',
    title: 'Junior',
    validateConfirm: false,
    validateError: false,
  };

  onLoginChange = (e) => {
    const { value } = e.target;
    this.setState({ login: value });
  }

  onPasswordChange = (e) => {
    const { value } = e.target;
    this.setState({ password: value });
  }

  onFirstNameChange = (e) => {
    const { value } = e.target;
    this.setState({ firstName: value });
  }

  onLastNameChange = (e) => {
    const { value } = e.target;
    this.setState({ lastName: value });
  }

  onLastNameChange = (e) => {
    const { value } = e.target;
    this.setState({ lastName: value });
  }

  onDepartmentChange = (e) => {
    this.setState({ department: e.value });
  }

  onTitleChange = (e) => {
    this.setState({ title: e.value });
  }

  validateFields = (data) => {
    const validate = Object.values(data).every(field => field !== '' && typeof field !== 'boolean');

    return validate;
  }

  userCreate = () => {
    const newUser = {
      login: this.state.login,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      department: this.state.department,
      title: this.state.title,
    }

    const validate = this.validateFields(newUser);

    this.setState({ validateConfirm: validate });

    if (validate) {
      UsersActions.createUser(newUser);
      this.setState({ login: '', password: '', firstName: '', lastName: '', department: '', title: '', validateError: false });
    } else {
      this.setState({ validateError: true });
    }
  }

  cancel = () => {
    this.setState({ login: '', password: '', firstName: '', lastName: '', department: '', title: '', validateError: false, validateConfirm: false });

    this.props.history.push('/login');
  }

  render() {
    const { validateConfirm, validateError, title, department } = this.state;
    const optionsTitle = ['Junior', 'Middle', 'Senior'];
    const optionsDepartment = ['Testing', 'Development', 'Devops', 'Business Intelligence']

    return (
      <div className="create-user">
        {validateConfirm
          && <div className='confirm-message'>
            <span className="message-icon">User created successfuly</span>
            <span className="message-icon__cross" onClick={this.cancel}>×</span></div>
        }
        {validateError && <div className='validate-fields'>
          <span>Enter the missing field</span></div>}
        <h2 className="form-name">Create User</h2>
        <div className="create-user-form">
          <input
            type='text'
            name='login'
            value={this.state.login}
            onChange={this.onLoginChange}
            className='create-user-form__login'
            placeholder='Login'
          />
          <PasswordMask
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
            inputClassName='login-page__password'
            className='password-container'
            placeholder='Password'
            useVendorStyles={false}
          />
          <input
            type='text'
            name='firstName'
            value={this.state.firstName}
            onChange={this.onFirstNameChange}
            className='create-user-form__firstName'
            placeholder='First name'
          />
          <input
            type='text'
            name='lastName'
            value={this.state.lastName}
            onChange={this.onLastNameChange}
            className='create-user-form__lastName'
            placeholder='Last name'
          />
          <div className='create-user-form__groups-dropdown'>
            <span>Work Title</span>
            <Dropdown
              options={optionsTitle}
              className='create-user-form__workTitle'
              onChange={this.onTitleChange}
              value={title}
              placeholder="Work title"
            />
            <span>Department</span>
            <Dropdown
              options={optionsDepartment}
              className='create-user-form__workTitle'
              onChange={this.onDepartmentChange}
              value={department}
              placeholder="Work title"
            />
          </div>
          <div className='create-user-form__footer'>
            <button
              className='create-user-form__button'
              disabled={!this.state.login}
              onClick={this.userCreate}
            >
              Create
            </button>
            <button
              className='create-user-form__button'
              onClick={this.cancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};
