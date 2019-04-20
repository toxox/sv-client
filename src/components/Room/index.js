import React, { Component } from 'react';
import { Message, Loader, Container, Header, Segment } from 'semantic-ui-react';
import { videos, room } from '../../services';
import Chat from './Chat';
import './styles.scss';

class Room extends Component {
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
    console.log(video);
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
              }?autoplay=1`}
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
