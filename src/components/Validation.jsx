import React, { Component, Fragment } from "react";

import "./validation.scss";

export default class Validation extends Component {
  state = {
    opened: false
  };

  render() {
    const { message, confirm } = this.props;
    const { opened } = this.state;

    return (
      <Fragment>
        {opened && validateConfirm && (
          <div className="confirm-message">
            <span className="message-icon">{message}</span>
            <span className="message-icon__cross" onClick={cancel}>
              ×
            </span>
          </div>
        )}
        {opened && validateError && (
          <div className="validate-fields">
            <span>{error}</span>
          </div>
        )}
      </Fragment>
    );
  }
}
