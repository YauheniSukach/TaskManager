import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const TaskActions = {
    loadTasks() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_REQUEST
        });

        api.listTasks()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_SUCCESS,
                tasks: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err
            })
        );
    },

    createTask(task) {
        api.createTask(task)
        .then(() =>
            this.loadTasks()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteTask(taskId) {
        api.deleteTask(taskId)
        .then(() =>
            this.loadTasks()
        )
        .catch(err =>
            console.error(err)
        );
    },

    
    updateTask(taskId, field) {
        api.updateTask(taskId, field)
        .then(() => this.loadTasks())
        .catch(err =>
            console.error(err)
        );
    }
};

export default TaskActions;