import React, { Component, Fragment } from 'react';
import TasksActions from '../actions/TasksActions';
import Board from 'react-trello'

import './TasksGrid.scss';

export default class TasksGrid extends Component {
  convertDataToTicketFormat = () => {
    const { tasks } = this.props;
    const cards = tasks.map(item => {
      return {
        id: item.id,
        title: item.name,
        description: item.text,
        state: item.state,
        label: item.progress,
      }
    });

    const data = {
      lanes: [
        {
          id: 'lane1',
          title: 'Planned Tasks',
          label: cards.filter(item => item.state === 'Planned').length || [],
          cards: cards.filter(item => item.state === 'Planned') || [],
        },
        {
          id: 'lane2',
          title: 'In progress',
          label: cards.filter(item => item.state === 'In progress').length || [],
          cards: cards.filter(item => item.state === 'In progress') || [],
        },
        {
          id: 'lane3',
          title: 'Resolved',
          label: cards.filter(item => item.state === 'Resolved').length || [],
          cards: cards.filter(item => item.state === 'Resolved') || [],
        },
        {
          id: 'lane4',
          title: 'Testing in progress',
          label: cards.filter(item => item.state === 'Testing in progress').length || [],
          cards: cards.filter(item => item.state === 'Testing in progress') || [],
        },
        {
          id: 'lane5',
          title: 'Completed',
          label: cards.filter(item => item.state === 'Completed').length || [],
          cards: cards.filter(item => item.state === 'Completed') || [],
        },
      ]
    };

    return data;
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    let state;

    switch (targetLaneId) {
      case 'lane1': {
        state = 'Planned';
        break;
      }
      case 'lane2': {
        state = 'In progress';
        break;
      }
      case 'lane3': {
        state = 'Resolved';
        break;
      }
      case 'lane4': {
        state = 'Testing in progress';
        break;
      }
      case 'lane5': {
        state = 'Completed';
        break;
      }
      default: {
        break;
      }
    }
    TasksActions.updateTask(cardId, { state: state, startProgressAt: (state === 'lane2' || state === 'lane4') || new Date() });
  }

  onCardClick = (cardId) => {
    const { getCurrentTaskId } = this.props;
    getCurrentTaskId(cardId);
  }

  onTaskDelete = (cardId) => {
    this.props.onTaskDelete(cardId);
  }

  render() {
    const data = this.convertDataToTicketFormat();

    return (
      <Fragment>
        <span className='tasks-grid__title'>{this.props.board}</span>
        <div className='tasks-grid'>
          <Board handleDragEnd={this.handleDragEnd} onCardDelete={this.onTaskDelete} onCardClick={this.onCardClick} className='tasks-grid__board' draggable data={data} />
        </div>
      </Fragment>
    );
  }
};
