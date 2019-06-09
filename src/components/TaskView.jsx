import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import TasksActions from '../actions/TasksActions';
import UserActions from '../actions/UsersActions';
import Comments from './Comments.jsx';
import moment from 'moment';
import './task-view.scss';

export default class TaskView extends Component {
  constructor(props) {
    super(props);

    const { tasks } = props;
    const currentData = tasks.filter(item => item.id === props.currentTaskId)[0];
    const { name, title, text, estimate, type, status, assigne, color } = currentData;

    this.state = {
      assigne,
      color,
      editTask: false,
      name: name,
      title: title,
      text: text,
      estimate: estimate,
      typeOfTask: type,
      status,
    }
  }

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

  onEditToggle = () => {
    const { editTask } = this.state;
    this.setState({ editTask: !editTask });
  }

  onNameChange = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  }

  onTitleChange = (e) => {
    const { value } = e.target;
    this.setState({ title: value });
  }

  onDescriptionChange = (e) => {
    const { value } = e.target;
    this.setState({ text: value });
  }

  onUserChange = (event) => {
    this.setState({ user: event.value });
  }

  onTypeOfTaskChange = (event) => {
    this.setState({ typeOfTask: event.value });
  }

  onEstimateChange = (event) => {
    this.setState({ estimate: event.value });
  }

  onPriorityChange = (event) => {
    switch (event.value) {
      case 'Minor':
        this.setState({ color: '#FFFF8D' });
        break;
      case 'Major':
        this.setState({ color: '#FFD180' })
        break;
      case 'Critical':
        this.setState({ color: '#FF8A80' })
        break;
      default:
        this.setState({ color: '' });
    }
    this.setState({ status: event.value });
  }

  editTask = () => {
    const { currentTaskId } = this.props;
    const {
      assigne,
      name,
      title,
      text,
      estimate,
      typeOfTask,
      status,
      color,
    } = this.state;

    TasksActions.updateTask(currentTaskId, {
      assigne,
      name,
      title,
      text,
      estimate,
      type: typeOfTask,
      status,
      color,
    });

    this.setState({ editTask: false });
  }

  render() {
    const { tasks, comments, currentTaskId } = this.props;
    const { editTask } = this.state;
    const currentData = tasks.filter(item => item.id === this.props.currentTaskId)[0];
    const dateString = currentData.startProgressAt && moment(currentData.startProgressAt).fromNow();
    const currentComments = comments.filter(comment => comment.taskId === currentTaskId);
    const typeOfTask = ['Bug', 'Improvement', 'Feature', 'Code refactoring'];
    const estimate = ['half hour', '1 hour', '2 hours', '4 hours', '8 hours', '16 hours', '1 day', '2 day', '4 days'];
    const priority = ['Minor', 'Major', 'Critical'];

    return (
      <div className='task-view'>
        {!editTask ? (<span className='task-view__title'>Task Overview</span>) :
        (<span className='task-view__title'>Edit Task</span>)}
        <div className='task-modal__buttons'>
          <button className='task-view__button' onClick={this.onEditToggle}>Edit Task</button>
          <button className='task-view__button'>Go to PDF</button>
          {
              editTask && (
                <button
                className='task-view__button'
                onClick={this.editTask}
              >
                Apply changes
                </button>
              )
            }
        </div>
        <div className='task-modal'>
          <span className="task-modal__header">Name</span>
          <input
            value={this.state.name}
            onChange={this.onNameChange}
            className='task-modal__text'
            disabled={!editTask}
          />
          <span className="task-modal__header">Title</span>
          <input
            value={this.state.title}
            onChange={this.onTitleChange}
            className='task-modal__text'
            disabled={!editTask}
          />
          <span className="task-modal__header">Description</span>
          <textarea
            disabled={!editTask}
            onChange={this.onDescriptionChange}
            rows={6}
            value={this.state.text}
            className='task-modal__description'
          />
          {editTask ? (
            <div className="task-modal__edit">
              <div className="task-modal__field">
                <span className="task-modal__header">Assigne</span>
                <Dropdown
                  options={typeOfTask}
                  disabled={!editTask}
                  menuClassName="task-modal__menu"
                  value={this.state.typeOfTask}
                  onChange={this.onTypeOfTaskChange}
                  placeholder="Type of task"
                />
              </div>
              <div className="task-modal__field">
                <span className="task-modal__header">Estimate</span>
                <Dropdown
                  menuClassName="task-modal__menu"
                  options={estimate}
                  disabled={!editTask}
                  value={this.state.estimate}
                  onChange={this.onEstimateChange}
                  placeholder="Estimate"
                />
              </div>
              <div className="task-modal__field">
                <span className="task-modal__header">Type of task</span>
                <Dropdown
                  menuClassName="task-modal__menu"
                  value={this.state.assigne}
                  options={this.props.users.map(user => `${user.firstName} ${user.lastName}`)}
                  onChange={this.onUserChange}
                  disabled={!editTask}
                  placeholder="Assign to"
                />
              </div>
              <div className="task-modal__field">
                <span className="task-modal__header">Priority</span>
                <Dropdown
                  value={this.state.status}
                  onChange={this.onPriorityChange}
                  value={this.state.status}
                  menuClassName="task-modal__menu"
                  options={priority}
                  disabled={!editTask}
                  placeholder="Priority"
                />
              </div>
            </div>
          ) : (
              <div className="task-modal__overview">
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
              </div>
            )}
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
