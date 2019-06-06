import React, { Component } from 'react';
import UserAvatar from './UserAvatar';
import './list-users.scss';

export default class ListUsers extends Component {
  render() {
    const { users, onClickUser } = this.props;

    return (
      <div className='list-users'>
        { users.map(item => <div onClick={onClickUser} className='list-users__user'><UserAvatar user={item} /></div>)}
      </div>
    )
  }
};