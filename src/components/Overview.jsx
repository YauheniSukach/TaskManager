import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './Overview.scss';

export default class Overview extends Component {
  state = {
    data: {
      labels: [
        'All tasks',
        'In progress',
        'Resolved',
        'In testing',
        'Closed',
        'Minor',
        'Major',
        'Critical'
      ],
      datasets: [{
        label: "Tasks Overview",
        data: [
          this.props.tasks.filter(task => task.state === 'Planned').length,
          this.props.tasks.filter(task => task.state === 'In progress').length,
          this.props.tasks.filter(task => task.state === 'Resolved').length,
          this.props.tasks.filter(task => task.state === 'Testing in progress').length,
          this.props.tasks.filter(task => task.state === 'Completed').length,
          this.props.tasks.filter(task => task.status === 'Minor').length,
          this.props.tasks.filter(task => task.status === 'Major').length,
          this.props.tasks.filter(task => task.status === 'Critical').length,
          0,
        ],
        backgroundColor: [
          '#FF6384',
          '#FFCE56',
          '#36A2EB',
          '#FF8A80',
          '#FFCE56',
          '#FFFF8D',
          '#FFD180',
          '#FF8A80',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#FFFF8D',
          '#36A2EB',
          '#FFCE56',
          '#FFD180',
          '#FF8A80',
          '#FFFF8D',
          '#FFCE56',
        ]
      }]
    }
  };

  render() {
    return (
      <div className='overview'>
        <span className='overview__title'>{this.props.nameBoard}</span>
        <Bar data={this.state.data} />
      </div>
    )
  }
};
