import React, { Component, Fragment } from 'react';
import ListUsers from './ListUsers';
import './search-user.scss';

export default class SearchUser extends Component {
  state = {
    openList: false,
    userString: null,
  }

  userFilter = () => {
    const { users } = this.props;
    const { userString } = this.state;
    const usersFiltered = userString && users.filter(user => user.firstName === userString);

    return usersFiltered;
  }

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ userString: value });
  }

  onClick = () => {
    const { openList } = this.state;

    this.setState({ openList: !openList })
  }

  onClickUser = (e) => {
    this.setState({ userString: e.target.innerText, openList: false });
  }

  getUserOverview = () => {
    const { getUserOverview } = this.props;
    const { userString } = this.state;

    getUserOverview(userString);
  }

  render() {
    const { users } = this.props;
    const { openList, userString } = this.state;
    const filteredUsers = this.userFilter();

    return (
      <div className='search-user'>
        <div className='search-user__search'>
          <input placeholder="Click for search user..." value={userString} onChange={this.onChange} className='search-user__input' onClick={this.onClick} />
          {openList && <ListUsers onClickUser={this.onClickUser} users={filteredUsers || users} />}
        </div>
        <button onClick={this.getUserOverview} className='search-user__button'>Select</button>
      </div>
    )
  }
};
