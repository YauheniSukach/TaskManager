import React, { Component } from 'react';
import moment from 'moment';
import Overview from './Overview.jsx';
import RadarOverview from './RadarOverview.jsx';
import './user-overview.scss';

export default class UserOverview extends Component {
	state = {
		openInfo: true,
		openOverview: false,
		openHistory: false,
	}

	onClickInformation = () => {
		this.setState({ openInfo: true, openOverview: false, openHistory: false });
	}

	onClickOverview = () => {
		this.setState({ openInfo: false, openOverview: true, openHistory: false });
	}

	onClickHistory = () => {
		this.setState({ openInfo: false, openOverview: false, openHistory: true });
	}

	render() {
		const { user } = this.props;
		const date = moment(new Date(user.createdAt)).fromNow().split('ago');
		const tasks = this.props.tasks.filter(task => user.assignTasks.some(item => item === task.name));

		return (
			<div className='user-overview'>
				<div className='user-overview__header'>
					<button onClick={this.onClickInformation} className='user-overview__button'>Information</button>
					<button onClick={this.onClickOverview} className='user-overview__button'>User Overview</button>
					<button onClick={this.onClickHistory} className='user-overview__button'>User History</button>
				</div>
				<div className='user-overview__body'>
					{this.state.openInfo &&
						<div className='task-modal'>
							<span>First Name</span>
							<span
								className='task-modal__text'
							>{user.firstName}</span>
							<span>Last Name</span>
							<span
								className='task-modal__text'
							>{user.lastName}</span>
							<span>Department</span>
							<span
								className='task-modal__text'
							>{user.department}</span>
							<span>Title</span>
							<span
								className='task-modal__text'
							>{user.title}</span>
							<span>Account created at</span>
							<span
								className='task-modal__text'
							>{date} ago</span>
						</div>
					}
					{this.state.openOverview && <Overview tasks={tasks} nameBoard="User Overview" />}
					{this.state.openHistory && <div className="user-overview__history">
						<span>Untimely completed tasks</span>
						<span
							className='task-modal__text'
						>{user.completedNotOnTime}</span>
						<span>In time completed tasks</span>
						<span
							className='task-modal__text'
						>{user.completedOnTime}</span>
						<span>Reopened tasks</span>
						<span
							className='task-modal__text'
						>{user.completedOnTime}</span>
						<span>Closed tasks</span>
						<span
							className='task-modal__text'
						>{user.closedTasks.length}</span>
					</div>
					}
					{this.state.openHistory && <RadarOverview user={user} />}
				</div>
			</div>
		)
	}
};
