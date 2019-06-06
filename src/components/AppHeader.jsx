import React, { Component } from 'react';
import SearchUser from './SearchUser';
import './AppHeader.scss';

export default class AppHeader extends Component {
  render() {
    const { account } = this.props;
    const currentUser = account && `${account.firstName} ${account.lastName}`;
    const userChart = currentUser && currentUser.split(' ').map(word => word.charAt(0)).join('');

    return (
      <div className='app-header'>
        <div className='user-avatar'>
          <span className='user-avatar__user_position'>{userChart}</span>
          <span className='user-avatar__user_name'>{currentUser}</span>
        </div>
        <SearchUser getUserOverview={this.props.getUserOverview} users={this.props.users} />
      </div>
    );
  }
};
