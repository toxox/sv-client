import React, { Component } from 'react';
import { AuthConsumer } from '../../contexts/auth';
import { videos } from '../../services';
import VideoGrid from '../VideoGrid';

class Dashboard extends Component {
  state = {
    videos: [],
    isFetching: false,
  };

  async componentDidMount() {
    this.setState({ isFetching: true });
    const { videosList } = await videos.list();
    this.setState({ videos: videosList, isFetching: false });
  }

  render() {
    return (
      <AuthConsumer>
        {({ user }) => {
          return (
            <VideoGrid
              videos={this.state.videos}
              isFetching={this.state.isFetching}
              isLoggedIn={!!user}
            />
          );
        }}
      </AuthConsumer>
    );
  }
}

export default Dashboard;
