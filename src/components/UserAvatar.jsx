import React, { Component } from 'react';
import './user-avatar.scss';

export default class UserAvatar extends Component {
  render() {
    const { user } = this.props;
    const currentUser = user && `${user.firstName} ${user.lastName}`;

    return (
      <div className='user-avatar'>
        <span className='user-avatar__user_position'></span>
        <span className='user-avatar__user_name'>{currentUser}</span>
      </div>
    );
  }
};