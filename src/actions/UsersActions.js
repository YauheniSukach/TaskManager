import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const UserActions = {
  loadUsers() {
    AppDispatcher.dispatch({
      type: Constants.LOAD_USERS_REQUEST
    });

    api.listUsers()
      .then(({ data }) =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_USERS_SUCCESS,
          users: data
        })
      )
      .catch(err =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_USERS_FAIL,
          error: err
        })
      );
  },

  createUser(user) {
    api.createUser(user)
      .then(() =>
        this.loadUsers()
      )
      .catch(err =>
        console.error(err)
      );
  },

  deleteUser(userId) {
    api.deleteTask(userId)
      .then(() =>
        this.loadUsers()
      )
      .catch(err =>
        console.error(err)
      );
  },

  updateUser(userId, field) {
    api.updateUser(userId, field)
      .then(() => this.loadUsers())
      .catch(err =>
        console.error(err)
      );
  }
};

export default UserActions;
