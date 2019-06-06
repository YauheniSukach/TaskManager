import React, { Component } from 'react';
import './side-panel.scss';

export default class SidePanel extends Component {
  getInitialState() {
    return {
      openEditor: false,
    };
  }

  handleLoginChange(event) {
    this.setState({ login: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className='side-panel'>
        <div className='side-panel__menu'>
          <button
            onClick={this.props.handleOpenEditor}
            className='side-panel__button'>
            Create Task
               </button>
          <button
            className='side-panel__button'
            onClick={this.props.handleOpenUserBoard}
          >My tasks</button>
          <button
            className='side-panel__button'
            onClick={this.props.handleOpenBoard}
          >Open general board
                </button>
          <button
            className='side-panel__button'
            onClick={this.props.handleOpenGraphics}
          >Overview
                </button>
          <button
            className='side-panel__button'
            onClick={this.props.handleLogOut}
          >Log out
                </button>
        </div>
      </div>
    );
  }
};
