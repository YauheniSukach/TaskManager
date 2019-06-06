import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const CommentsActions = {
	loadComments() {
		AppDispatcher.dispatch({
			type: Constants.LOAD_COMMENTS_REQUEST
		});

		api.listComments()
			.then(({ data }) =>
				AppDispatcher.dispatch({
					type: Constants.LOAD_COMMENTS_SUCCESS,
					comments: data
				})
			)
			.catch(err =>
				AppDispatcher.dispatch({
					type: Constants.LOAD_COMMENTS_FAIL,
					error: err
				})
			);
	},

	createComment(comment) {
		api.createComment(comment)
			.then(() =>
				this.loadComments()
			)
			.catch(err =>
				console.error(err)
			);
	},

	deleteComment(commentId) {
		api.deleteComment(commentId)
			.then(() =>
				this.loadComments()
			)
			.catch(err =>
				console.error(err)
			);
	},


	updateComment(commentId, field) {
		api.updateTask(commentId, field)
			.then(() => this.loadComments())
			.catch(err =>
				console.error(err)
			);
	}
};

export default CommentsActions;
