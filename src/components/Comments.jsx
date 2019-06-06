import React, { Component } from 'react';
import CommentsStore from '../stores/CommentsStore';
import moment from 'moment';
import CommentsActions from '../actions/CommentsActions';
import './comments.scss';

export default class Comments extends Component {
  state = {
    message: '',
  };

  onSubmit = () => {
    const { account, taskId } = this.props;
    const { message } = this.state;
    const commentData = {
      message,
      account,
      taskId,
    }

    CommentsActions.createComment(commentData);

    this.setState({ message: '' });
  }

  onCancel = () => {
    this.setState({ message: '' });
  }

  onMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }

  render() {

    return (
      <div className="comments__container">
        <span className="comments__title">Comments to task</span>
        <div className='comments'>
          {this.props.comments.map(comment => {
            const date = moment(new Date(comment.createdAt)).fromNow();
            const user = `${comment.account.firstName} ${comment.account.lastName}`;
            const userTitle = `${user} commented ${date}`;
            return <div className='comments__comment'>
              <header className='comments__header'>
                {userTitle}
              </header>
              <textarea
                disabled
                rows={3}
                value={comment.message}
                className='comments__message'
              />
            </div>
          })}
        </div>
        <textarea placeholder="Write comment" className="comments__area" value={this.state.message} onChange={this.onMessageChange} />
        <div className="comments__buttons">
          <button className='task-modal__button' onClick={this.onSubmit}>
            Submit
            </button>
          <button className='task-modal__button' onClick={this.onCancel}>
            Cancel
            </button>
        </div>
      </div>
    );
  }
};
