import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Loader, Header } from 'semantic-ui-react';
import { videos } from '../../services';
import Chat from './Chat';
import './styles.scss';

class Room extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
  };

  state = {
    isFetching: false,
    error: null,
    video: null,
  };

  async componentDidMount() {
    const video = await videos.show(this.props.videoId);
    if (!video) {
      this.setState({ error: 'This stream does not exist', isFetching: false });
      return;
    }
    this.setState({ video, isFetching: false });
  }

  componentDidCatch() {}

  render() {
    if (this.state.isFetching) {
      return (
        <>
          <Loader
            inline="centered"
            size="massive"
            active={this.state.isFetching}
          >
            Loading
          </Loader>
        </>
      );
    }
    if (this.state.error) {
      return (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{this.state.error}</p>
        </Message>
      );
    }
    if (!this.state.video) return null;
    return (
      <main id="room">
        <section id="video-wrapper">
          <div id="video-container">
            <iframe
              title="video"
              id="video-player"
              src={`https://www.youtube.com/embed/${
                this.props.videoId
              }?autoplay=1&mute=1`}
              frameBorder="0"
            />
          </div>
          <section id="video-info">
            <Header as="h2">{this.state.video.snippet.title}</Header>
          </section>
        </section>
        <Chat videoId={this.props.videoId} />
      </main>
    );
  }
}

export default Room;
