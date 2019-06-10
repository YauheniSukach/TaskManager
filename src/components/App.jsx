import React, { PureComponent } from "react";

import TasksStore from "../stores/TasksStore";
import UsersStore from "../stores/UsersStore";
import CommentsStore from "../stores/CommentsStore";
import CommentsActions from "../actions/CommentsActions";
import TasksActions from "../actions/TasksActions";
import UsersActions from "../actions/UsersActions";
import SidePanel from "./SidePanel.jsx";
import Overview from "./Overview.jsx";
import UserOverview from "./UserOverview.jsx";

import TaskEditor from "./TaskEditor.jsx";
import AppHeader from "./AppHeader.jsx";
import TaskView from "./TaskView";
import TasksGrid from "./TasksGrid.jsx";

import withAuth from "../utils/checkAuth";

import "./App.scss";

function getStateFromFlux() {
  return {
    tasks: TasksStore.getTasks(),
    users: UsersStore.getUsers(),
    comments: CommentsStore.getComments()
  };
}

class App extends PureComponent {
  constructor() {
    super();

    const items = getStateFromFlux();

    this.state = {
      openTaskView: false,
      currentTaskId: null,
      openEditor: true,
      openBoard: false,
      openUserBoard: false,
      openGraphics: false,
      openUserOverview: false,
      openPanel: false,
      userSearch: null,
      tasks: [...items.tasks],
      users: [...items.users],
      comments: [...items.comments]
    };
  }

  componentDidMount() {
    TasksActions.loadTasks();
    UsersActions.loadUsers();
    CommentsActions.loadComments();
    CommentsStore.addChangeListener(this._onChange);
    TasksStore.addChangeListener(this._onChange);
    UsersStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    CommentsStore.removeChangeListener(this._onChange);
    TasksStore.removeChangeListener(this._onChange);
    UsersStore.removeChangeListener(this._onChange);
  }

  taskDelete = id => {
    const { users, tasks } = this.state;
    const task = tasks.find(task => task.id === id);
    const currentUser = users.find(user =>
      user.assignTasks.some(currentTask => currentTask === task.name)
    );
    const assignTasks = currentUser.assignTasks.filter(
      currentTask => currentTask !== task.name
    );
    UsersActions.updateUser(currentUser.id, { assignTasks: assignTasks });
    TasksActions.deleteTask(id);
  };

  handleTaskAdd = taskData => {
    TasksActions.createTask(taskData);
  };

  handleOpenEditor = () => {
    this.setState({
      openEditor: true,
      openPanel: false,
      openBoard: false,
      openUserBoard: false,
      openGraphics: false,
      openUserOverview: false
    });
  };

  handleOpenBoard = () => {
    this.setState({
      openBoard: true,
      openUserBoard: false,
      openPanel: false,
      openEditor: false,
      openGraphics: false,
      openUserOverview: false
    });
  };

  handleOpenUserBoard = () => {
    this.setState({
      openUserBoard: true,
      openBoard: false,
      openPanel: false,
      openEditor: false,
      openGraphics: false,
      openUserOverview: false
    });
  };

  handleOpenGraphics = () => {
    this.setState({
      openUserBoard: false,
      openBoard: false,
      openPanel: false,
      openEditor: false,
      openGraphics: true,
      openUserOverview: false
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("usertoken");
    this.props.history.push("/login");
  };

  getCurrentTaskId = id => {
    this.setState({
      currentTaskId: id,
      openUserBoard: false,
      openBoard: false,
      openPanel: true,
      openEditor: false,
      openGraphics: false,
      openUserOverview: false
    });
  };

  closePanel = () => {
    const { openPanel } = this.state;
    this.setState({ openPanel: !openPanel, openEditor: true });
  };

  getUserOverview = userString => {
    this.setState({
      userSearch: userString,
      openUserOverview: true,
      openPanel: false,
      openUserBoard: false,
      openBoard: false,
      openEditor: false,
      openGraphics: false
    });
  };

  render() {
    const { account } = this.props;
    const currentUserTasks = this.state.users
      .filter(user => user.firstName === account.firstName)
      .map(user => user.assignTasks);
    const searchUser = this.state.users.find(
      user => `${user.firstName} ${user.lastName}` === this.state.userSearch
    );

    return (
      <div className="app">
        <AppHeader
          getUserOverview={this.getUserOverview}
          users={this.state.users}
          account={account}
        />
        <div className="app__content">
          <SidePanel
            handleOpenEditor={this.handleOpenEditor}
            handleOpenBoard={this.handleOpenBoard}
            handleOpenUserBoard={this.handleOpenUserBoard}
            handleLogOut={this.handleLogOut}
            handleOpenGraphics={this.handleOpenGraphics}
            users={this.state.users}
          />
          <div className="app__grid">
            {this.state.openPanel && (
              <TaskView
                account={this.props.account}
                comments={this.state.comments}
                closePanel={this.closePanel}
                taskDelete={this.taskDelete}
                users={this.state.users}
                tasks={this.state.tasks}
                currentTaskId={this.state.currentTaskId}
              />
            )}
            {this.state.openGraphics && (
              <Overview nameBoard="Project Overview" tasks={this.state.tasks} />
            )}
            {this.state.openEditor && (
              <TaskEditor
                onTaskAdd={this.handleTaskAdd}
                users={this.state.users}
              />
            )}
            {this.state.openBoard && (
              <TasksGrid
                board="General board"
                getCurrentTaskId={this.getCurrentTaskId}
                users={this.state.users}
                onTaskDelete={this.taskDelete}
                tasks={
                  this.state.tasks &&
                  this.state.tasks.filter(task => task.status !== "Closed")
                }
              />
            )}
            {this.state.openUserBoard && (
              <TasksGrid
                board="User board"
                getCurrentTaskId={this.getCurrentTaskId}
                users={this.state.users}
                onTaskDelete={this.taskDelete}
                tasks={
                  this.state.tasks &&
                  this.state.tasks.filter(task =>
                    currentUserTasks[0].some(
                      currentTask =>
                        currentTask === task.name &&
                        currentTask.status !== "Closed"
                    )
                  )
                }
              />
            )}
            {this.state.openUserOverview && (
              <UserOverview tasks={this.state.tasks} user={searchUser} />
            )}
          </div>
        </div>
      </div>
    );
  }

  _onChange = () => {
    this.setState(getStateFromFlux());
  };
}

const protectedComponent = withAuth(App);

export default protectedComponent;
