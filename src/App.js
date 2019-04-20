import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import ActionCable from 'actioncable';
import Page from './components/Page';

import Dashboard from './components/Dashboard';

class App extends Component {
  state = {
    user: null,
    messages: [],
    newMessage: '',
  };

  async componentDidMount() {
    // console.log(data);
    // this.setState({ messages: data });
    // const cable = ActionCable.createConsumer(
    //   'ws://limitless-river-20437.herokuapp.com/ws'
    // );
    // cable.subscriptions.create(
    //   { channel: 'RoomChannel', room: 1, token },
    //   {
    //     received: data => {
    //       this.onMessageReceived(JSON.parse(data));
    //     },
    //   }
    // );
  }

  onMessageReceived = message => {
    this.setState(prevState => {
      return { messages: [...prevState.messages, message] };
    });
  };

  send = async () => {
    const token = localStorage.getItem('token');
    console.log(token);

    const { newMessage } = this.state;

    if (!newMessage || !newMessage.length) return;

    const { data } = await axios.post(
      `https://limitless-river-20437.herokuapp.com/room/1`,
      {
        body: this.state.newMessage,
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );

    this.setState({ newMessage: '' });
  };

  render() {
    return (
      <div className="App">
        <Page>
          <Dashboard />
        </Page>
      </div>
    );
  }
}

export default App;
