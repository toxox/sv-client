import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../services';

const Auth = React.createContext({});

export const AuthConsumer = Auth.Consumer;

export class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    user: null,
    isFetching: false,
  };

  async componentDidMount() {
    this.setState({ isFetching: true });
    const { user } = await auth.me();
    this.setState({ user, isFetching: false });
  }

  login = async googleResponse => {
    this.setState({ isFetching: true });
    const { user } = await auth.login(googleResponse);
    this.setState({ user, isFetching: false });
  };

  logout = () => {
    auth.logout();
    this.setState({
      user: null,
      isFetching: false,
    });
  };

  render() {
    return (
      <Auth.Provider
        value={{
          user: this.state.user,
          isFetching: this.state.isFetching,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </Auth.Provider>
    );
  }
}
