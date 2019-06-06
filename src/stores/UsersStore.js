import { EventEmitter } from 'events';

import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';


const CHANGE_EVENT = 'change';

let _users = [];
let _userId = null;
let _loadingError = null;
let _isLoading = true;

function formatUser(user) {
    return {
        id: user._id,
        login: user.login,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title,
        department: user.department,
        assignTasks: user.assignTasks,
        status: user.status,
        createdAt: user.createdAt,
        reopenedTasks: user.reopenedTasks,
        closedTasks: user.closedTasks,
        completedOnTime: user.completedOnTime,
        resolvedTasks: user.resolvedTasks,
        completedNotOnTime: user.completedNotOnTime,
    };
}

const UsersStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getUsers() {
        return _users;
    },

    getUserLogin() {
        return _userId;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {
    switch (action.type) {
        case AppConstants.LOAD_USERS_REQUEST: {
            _isLoading = true;

            UsersStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USERS_SUCCESS: {
            _isLoading = false;
            _users = action.users.map(formatUser);
            _loadingError = null;

            UsersStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USERS_FAIL: {
            _loadingError = action.error;

            UsersStore.emitChange();
            break;
        }

        case AppConstants.LOGIN_USER_REQUEST: {
            _userId = action.userId;

            UsersStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default UsersStore;
