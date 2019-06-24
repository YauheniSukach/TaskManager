import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {
  login(data) {
    return axios.post(`${apiPrefix}/users/login`, data);
  },

  getAccount() {
    return axios.get(`${apiPrefix}/users/account`);
  },

  listTasks() {
    return axios.get(`${apiPrefix}/tasks/all-tasks`);
  },

  createTask(data) {
    return axios.post(`${apiPrefix}/tasks/create`, data);
  },

  deleteTask(taskId) {
    return axios.delete(`${apiPrefix}/tasks/all-tasks/${taskId}`);
  },

  updateTask(taskId, field) {
    return axios.put(`${apiPrefix}/tasks/all-tasks/${taskId}`, field);
  },

  listUsers() {
    return axios.get(`${apiPrefix}/users/all-users`);
  },

  updateUser(userId, field) {
    return axios.put(`${apiPrefix}/users/all-users/${userId}`, field);
  },

  createUser(data) {
    return axios.post(`${apiPrefix}/users/register`, data);
  },

  deleteUser(userId) {
    return axios.delete(`${apiPrefix}/users/all-users/${uesrId}`);
  },

  listComments() {
    return axios.get(`${apiPrefix}/comments/all-comments`);
  },

  updateComment(userId, field) {
    return axios.put(`${apiPrefix}/comments/all-comments/${userId}`, field);
  },

  createComment(data) {
    return axios.post(`${apiPrefix}/comments/submit`, data);
  },

  deleteComment(userId) {
    return axios.delete(`${apiPrefix}/comments/all-comments/${uesrId}`);
  },

  upload(image) {
    return axios.post(`${apiPrefix}/images/upload`, image);
  }
}
