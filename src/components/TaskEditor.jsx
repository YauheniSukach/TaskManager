import React, { Component } from "react";
import Dropdown from "react-dropdown";
import UserActions from "../actions/UsersActions.js";
import ImagesActions from "../actions/ImagesActions.js";
import ColorPicker from "./ColorPicker.jsx";
import "./TaskEditor.scss";

export default class TaskEditor extends Component {
  state = {
    image: null,
    free: false,
    name: "",
    title: "",
    text: "",
    color: "#FFFFFF",
    status: "",
    state: "Planned",
    typeOfTask: "",
    estimate: "",
    user: ""
  };

  handleTextChange = event => {
    this.setState({ text: event.target.value });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handleColorChange = color => {
    switch (color) {
      case "#FFFF8D":
        this.setState({ status: "Minor" });
        break;
      case "#FFD180":
        this.setState({ status: "Major" });
        break;
      case "#FF8A80":
        this.setState({ status: "Critical" });
        break;
      default:
        this.setState({ status: "" });
    }
    this.setState({ color });
  };

  handleAssignToFree = () => {
    this.setState({ free: !this.state.free });
  };

  handleTaskAdd = () => {
    if (this.state.free) {
      const minTasks = Math.min.apply(
        null,
        this.props.users.map(user => user.assignTasks.length)
      );
      const maxCompletedOnTime = Math.max.apply(
        null,
        this.props.users.map(user => user.completedOnTime)
      );
      const minCompletedNotOntime = Math.min.apply(
        null,
        this.props.users.map(user => user.completedNotOnTime)
      );
      const freeUser = this.props.users.find(
        user =>
          user.assignTasks.length === minTasks &&
          minCompletedNotOntime === user.completedNotOnTime &&
          maxCompletedOnTime === user.completedOnTime
      );
      UserActions.updateUser(freeUser.id, {
        assignTasks: [...freeUser.assignTasks, this.state.name]
      });
    } else {
      const updateUser = this.props.users.find(
        user => user.firstName === this.state.user.split(" ")[0]
      );
      const assignTasks = updateUser.assignTasks;
      UserActions.updateUser(updateUser.id, {
        assignTasks: [...assignTasks, this.state.name]
      });
    }

    const newTask = {
      assigne: this.state.user,
      name: this.state.name,
      title: this.state.title,
      text: this.state.text,
      color: this.state.color,
      status: this.state.status,
      state: this.state.state,
      type: this.state.typeOfTask,
      estimate: this.state.estimate
    };

    this.props.onTaskAdd(newTask);
    this.setState({
      name: "",
      status: "",
      text: "",
      type: "",
      estimate: "",
      state: "Planned",
      title: "",
      free: false,
      color: "#FFFFFF",
      user: ""
    });
  };

  handleUserChange = event => {
    this.setState({ user: event.value });
  };

  handleTypeOfTaskChange = event => {
    this.setState({ typeOfTask: event.value });
  };

  handleEstimateChange = event => {
    this.setState({ estimate: event.value });
  };

  onImageChange = (e) => {
    this.setState({ image: e.target.value });
  }

  upload = () => {
    const { image } = this.state;
    console.log('IMAGE', image);
    ImagesActions.upload(image);
  };

  render() {
    const typeOfTask = ["Bug", "Improvement", "Feature", "Code refactoring"];
    const estimate = [
      "half hour",
      "1 hour",
      "2 hours",
      "4 hours",
      "8 hours",
      "16 hours",
      "1 day",
      "2 day",
      "4 days"
    ];

    return (
      <div className="task-editor">
        <span className="createTask">Create Task</span>
        <input
          type="text"
          className="task-editor__name"
          placeholder="Enter name for task"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input
          type="text"
          className="task-editor__title"
          placeholder="Enter title for task"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          placeholder="Enter description"
          rows={5}
          className="task-editor__text"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="task-editor__toolbar">
          <ColorPicker
            className="color-picker"
            value={this.state.color}
            onChange={this.handleColorChange}
          />
          <Dropdown
            options={typeOfTask}
            disabled={this.state.free}
            value={this.state.typeOfTask}
            onChange={this.handleTypeOfTaskChange}
            placeholder="Type of task"
          />
          <Dropdown
            options={estimate}
            disabled={this.state.free}
            value={this.state.estimate}
            onChange={this.handleEstimateChange}
            placeholder="Estimate"
          />
          <Dropdown
            options={this.props.users.map(
              user => `${user.firstName} ${user.lastName}`
            )}
            disabled={this.state.free}
            value={this.state.user}
            onChange={this.handleUserChange}
            placeholder="Assign to"
          />
          <input value={this.state.image} onChange={this.onImageChange} id="file-input" type="file" name="name" />
          <button onClick={this.upload}>Upload image</button>
        </div>
        <div className="task-editor__footer">
          <div className="checkbox-field">
            <span className="task-editor__checkbox-text">
              Assign with efficiency
            </span>
            <input
              disabled={this.state.user}
              className="task-editor__checkbox"
              type="checkbox"
              id="check"
              onClick={this.handleAssignToFree}
            />
          </div>
          <button
            className="task-editor__button"
            disabled={!this.state.status}
            onClick={this.handleTaskAdd}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
