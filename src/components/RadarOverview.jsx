import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

export default class RadarOverview extends Component {
    state = {
        data: {
            labels: [
                'Untimely completed tasks',
                'In time completed tasks',
                'Reopened tasks',
                'Resolved tasks',
                'Closed tasks',
            ],
            datasets: [{
                label: "History Overview",
                data: [
                    this.props.user.completedNotOnTime,
                    this.props.user.completedOnTime,
                    this.props.user.reopenedTasks,
                    this.props.user.resolvedTasks,
                    this.props.user.closedTasks.length,
                ],
                backgroundColor: [
                    '#FF8A80',
                ],
                borderColor: [
                    '#FFD180',
                ],
                pointBackgroundColor: [
                    '#FF8A80',
                ]
            }]
        }
    };

    render() {
        return (
            <div className='overview__radar'>
                <span className='overview__title'>{this.props.nameBoard}</span>
                <Radar data={this.state.data} />
            </div>
        )
    }
};
