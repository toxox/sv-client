import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'semantic-ui-react';
import { room } from '../../../services';
import Message from '../Message';
import './styles.scss';

class Room extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
  };

  state = {
    isFetching: false,
    messages: [],
    newMessage: '',
  };

  messagesEnd = React.createRef();

  async componentDidMount() {
    this.setState({ isFetching: true });
    const messages = await room.show(this.props.videoId);
    this.setState({ messages, isFetching: false });

    room.createSocketConnection({
      videoId: this.props.videoId,
      onMessageReceived: this.onMessageReceived,
    });
  }

  sendMessage = async e => {
    e.preventDefault();
    const { newMessage } = this.state;
    if (!newMessage || !newMessage.length) return;

    this.setState({ newMessage: '' });

    await room.post({
      videoId: this.props.videoId,
      body: newMessage,
    });
  };

  onMessageReceived = message => {
    this.setState(
      prevState => {
        return { messages: [...prevState.messages, message] };
      },
      () => {
        this.messagesEnd.current.scrollIntoView();
      }
    );
  };

  render() {
    const { isFetching, messages, newMessage } = this.state;
    return (
      <div id="chat">
        <div id="messages">
          {messages.map(message => {
            return <Message key={message.id} message={message} />;
          })}
          <div ref={this.messagesEnd} />
        </div>
        <form onSubmit={this.sendMessage}>
          <Input
            value={newMessage}
            onChange={e => this.setState({ newMessage: e.target.value })}
          />
          <Button color="violet" type="submit" disabled={isFetching}>
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default Room;
