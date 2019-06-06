import React, { Component } from 'react';
import TasksActions from '../actions/TasksActions';
import UserActions from '../actions/UsersActions';
import Comments from './Comments.jsx';
import moment from 'moment';
import './task-view.scss';

export default class TaskView extends Component {
  startProgress = () => {
    const { currentTaskId } = this.props;
    TasksActions.updateTask(currentTaskId, { startProgressAt: new Date(), state: 'In progress' });
  }

  resolveTicket = () => {
    const { currentTaskId, tasks, users } = this.props;
    const currentData = tasks.filter(item => item.id === this.props.currentTaskId)[0];
    const assigne = currentData.assigne;
    const assigneResolve = users.find(user => `${user.firstName} ${user.lastName}` === assigne);
    const estimateResolve = currentData.estimate.split(' ');
    const taskProgress = moment(currentData.startProgressAt).fromNow().split(' ');

    if (estimateResolve[0] > taskProgress[0] &&
      (estimateResolve[1] === 'hour' && taskProgress[1] === 'hour') ||
      (estimateResolve[1] === 'hours' && taskProgress[1] === 'hours') ||
      (estimateResolve[1] === 'day' && taskProgress[1] === 'day') ||
      (estimateResolve[1] === 'days' && taskProgress[1] === 'days')
    ) {
      UserActions.updateUser(assigneResolve.id, { resolvedTasks: assigneResolve.resolvedTasks + 1, completedNotOnTime: assigneResolve.completedNotOnTime + 1 });
      TasksActions.updateTask(currentTaskId, { state: 'Resolved' });
    } else {
      UserActions.updateUser(assigneResolve.id, { resolvedTasks: assigneResolve.resolvedTasks + 1, completedOnTime: assigneResolve.completedOnTime + 1 });
      TasksActions.updateTask(currentTaskId, { state: 'Resolved' });
    }
  }

  closeTicket = () => {
    const { currentTaskId, tasks, users } = this.props;
    const currentData = tasks.filter(item => item.id === this.props.currentTaskId)[0];
    const assigne = currentData.assigne;
    const assigneResolve = users.find(user => `${user.firstName} ${user.lastName}` === assigne);


    UserActions.updateUser(assigneResolve.id, { closedTasks: [...assigneResolve.closedTasks, currentData.name] });
    TasksActions.updateTask(currentTaskId, { state: 'Completed' });
  }

  readyToTesting = () => {
    const { currentTaskId } = this.props;

    TasksActions.updateTask(currentTaskId, { startProgressAt: new Date(), state: 'Testing in progress' });
  }

  reopenTicket = () => {
    const { currentTaskId, tasks, users } = this.props;
    const currentData = tasks.filter(item => item.id === this.props.currentTaskId)[0];
    const assigne = currentData.assigne;
    const assigneResolve = users.find(user => `${user.firstName} ${user.lastName}` === assigne);


    UserActions.updateUser(assigneResolve.id, { reopenedTasks: assigneResolve.reopenedTasks + 1 });

    TasksActions.updateTask(currentTaskId, { state: 'Planned' });
  }

  render() {
    const { tasks, comments, currentTaskId } = this.props;
    const currentData = tasks.filter(item => item.id === this.props.currentTaskId)[0];
    const dateString = currentData.startProgressAt && moment(currentData.startProgressAt).fromNow();
    const currentComments = comments.filter(comment => comment.taskId === currentTaskId);

    return (
      <div className='task-view'>
        <span className='task-view__title'>Task Overview</span>
        <div className='task-modal'>
          <span className="task-modal__header">Name</span>
          <span
            className='task-modal__text'
          >{currentData.name}</span>
          <span className="task-modal__header">Title</span>
          <span
            className='task-modal__text'
          >{currentData.title}</span>
          <span className="task-modal__header">Description</span>
          <textarea
            disabled
            rows={6}
            value={currentData.text}
            className='task-modal__description'
          />
          <span className="task-modal__header">Assigne</span>
          <span
            className='task-modal__text'
          >{currentData.assigne}</span>
          <span className="task-modal__header">Estimate</span>
          <span
            className='task-modal__text'
          >{currentData.estimate}</span>
          <span className="task-modal__header">Type of task</span>
          <span
            className='task-modal__text'
          >{currentData.type}</span>
          <span className="task-modal__header">Priority</span>
          <span
            className='task-modal__text'
            style={{ backgroundColor: currentData.color }}
          >{currentData.status}</span>
          <span className="task-modal__header">Status</span>
          <span
            className='task-modal__text'
          >{currentData.state}</span>
          {(currentData.state === 'In progress' ||
            currentData.state === 'Testing in progress') &&
            <div className='task-modal__progress'>
              <span className="task-modal__header">In progress</span>
              <span
                className='task-modal__text'
              >{dateString}</span>
            </div>
          }
          <div className='task-modal__footer'>
            {
              currentData.state === 'Planned' &&
              <button
                className='task-modal__button'
                onClick={this.startProgress}
              >
                Ready
              </button>
            }
            {currentData.state === 'In progress' &&
              <button
                className='task-modal__button'
                onClick={this.resolveTicket}
              >
                Resolve ticket
              </button>
            }
            {currentData.state === 'Resolved' &&
              <button
                className='task-modal__button'
                onClick={this.readyToTesting}
              >
                Ready to testing
                        </button>
            }
            {currentData.state === 'Testing in progress' &&
              <div className='task-modal__buttons-group'>
                <button
                  className='task-modal__button'
                  onClick={this.closeTicket}
                >
                  Verify and closed
              </button>
                <button
                  className='task-modal__button'
                  onClick={this.reopenTicket}
                >
                  Reopen task
              </button>
              </div>
            }
            <button
              className='task-modal__button'
              onClick={this.props.closePanel}
            >
              Close
              </button>
          </div>
        </div>
        <Comments taskId={currentTaskId} account={this.props.account} comments={currentComments} />
      </div >
    )
  }
};
