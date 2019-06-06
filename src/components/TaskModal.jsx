import React, { Component } from 'react';
import moment from 'moment';
import './TaskModal.scss';

export default class TaskModal extends Component {
    getInitialState() {
        return {
            free: false,
            name: '',
            title: '',
            text: '',
            color: '#FFFFFF',
            user: '',
            status: '',
        };
    }

    render() {
        const currentDate = this.props.progress && new Date(this.props.progress);
        const dateString = moment(currentDate).fromNow().split('ago');
        return (
            <div className='task-modal'>
                <span>Name</span>
                <span
                    className='task-modal__name'
                >{this.props.name}</span>
                <span>Title</span>
                <span
                    className='task-modal__title'
                >{this.props.title}</span>
                <span>Description</span>
                <span
                    className='task-modal__text'
                >{this.props.text}</span>
                <span>Assigne</span>
                <span
                    className='task-modal__text'
                >{this.props.assigne}</span>
                <span>Status</span>
                <span
                    className='task-modal__text'
                    style={{backgroundColor: this.props.color}}
                >{this.props.status}</span>
                <span>In progress</span>
                <span
                    className='task-modal__text'
                >{this.props.progress ? dateString : 'None'}</span>
                <div className='task-modal__footer'>
                    { 
                        this.props.progress ?
                        <button
                        className='task-modal__button'
                        onClick={this.props.closeProgress}
                        >
                        Close ticket
                        </button>
                        :
                        <button
                            className='task-modal__button'
                            onClick={this.props.startProgress}
                        >
                        Start Progress
                        </button>
                    }
                    <button
                        className='task-modal__button'
                        onClick={this.props.openTicket}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
};
