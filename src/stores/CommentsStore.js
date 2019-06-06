import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _comments = [];
let _loadingError = null;
let _isLoading = true;

function formatComment(comment) {
  return {
    id: comment._id,
    createdAt: comment.createdAt,
    message: comment.message,
    account: comment.account,
    taskId: comment.taskId,
  };
}

const CommentsStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getComments() {
    return _comments;
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
    case AppConstants.LOAD_COMMENTS_REQUEST: {
      _isLoading = true;
      CommentsStore.emitChange();
      break;
    }

    case AppConstants.LOAD_COMMENTS_SUCCESS: {
      _isLoading = false;
      _comments = action.comments.map(formatComment);
      _loadingError = null;

      CommentsStore.emitChange();
      break;
    }

    case AppConstants.LOAD_COMMENTS_FAIL: {
      _loadingError = action.error;
      CommentsStore.emitChange();
      break;
    }

    default: {
      console.log('No such handler');
    }
  }
});

export default CommentsStore;
