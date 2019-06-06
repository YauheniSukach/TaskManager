import React, { Component } from 'react';
import cx from 'classnames';

import './ColorPicker.scss';

export default class ColorPicker extends Component {
  render() {
    return (
      <div className='ColorPicker'>
        <span>Minor</span>
        <div
          key={'#FFFF8D'}
          className={cx('ColorPicker__swatch', { selected: this.props.value === '#FFFF8D' })}
          style={{ backgroundColor: '#FFFF8D' }}
          onClick={this.props.onChange.bind(null, '#FFFF8D')}
        />
        <span>Major</span>
        <div
          key={'#FFD180'}
          className={cx('ColorPicker__swatch', { selected: this.props.value === '#FFD180' })}
          style={{ backgroundColor: '#FFD180' }}
          onClick={this.props.onChange.bind(null, '#FFD180')}
        />
        <span>Critical</span>
        <div
          key={'#FF8A80'}
          className={cx('ColorPicker__swatch', { selected: this.props.value === '#FF8A80' })}
          style={{ backgroundColor: '#FF8A80' }}
          onClick={this.props.onChange.bind(null, '#FF8A80')}
        />
      </div>
    );
  }
};
