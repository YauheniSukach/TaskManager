import React, { Fragment, PureComponent } from 'react';
import Spinner from 'react-svg-spinner';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function withAuth(ComponentToProtect) {
  return class extends PureComponent {
    constructor() {
      super();
      this.state = {
        account: null,
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      const token = localStorage.usertoken;

      if (token) {
        const decoded = jwt_decode(token);
        this.setState({
          account: {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
        }, loading: false })
      } else {
        this.setState({ redirect: true, loading: false })
      }
    }

    render() {
      const { loading, redirect, account } = this.state;
      if (loading) {
        return <Spinner />;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <Fragment>
          <ComponentToProtect account={account} {...this.props} />
        </Fragment>
      );
    }
  }
};
