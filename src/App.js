import React, { Component } from "react";
import "./App.css";

import { GoogleLogin } from "react-google-login";
import axios from "axios";
import ActionCable from "actioncable";

class App extends Component {
  state = {
    user: null,
    messages: [],
    newMessage: ""
  };

  async componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token);

    const { data } = await axios.get(`https://limitless-river-20437.herokuapp.com/room/1`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });

    console.log(data);
    this.setState({ messages: data });

    const cable = ActionCable.createConsumer("ws://limitless-river-20437.herokuapp.com/ws");
    cable.subscriptions.create(
      { channel: "RoomChannel", room: 1, token },
      {
        received: data => {
          this.onMessageReceived(JSON.parse(data));
        }
      }
    );
  }

  onMessageReceived = message => {
    this.setState(prevState => {
      return { messages: [...prevState.messages, message] };
    });
  };

  send = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const { newMessage } = this.state;

    if (!newMessage || !newMessage.length) return;

    const { data } = await axios.post(
      `https://limitless-river-20437.herokuapp.com/room/1`,
      {
        body: this.state.newMessage
      },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      }
    );

    this.setState({ newMessage: "" });
  };

  responseGoogle = async response => {
    console.log(response);
    const { data } = await axios.post(`https://limitless-river-20437.herokuapp.com/auth/google`, {
      token: response.tokenId
    });
    console.log(data);

    localStorage.setItem("token", `Bearer ${data.token}`);
  };
  render() {
    return (
      <div className="App">
        {this.state.user ? "logged in" : "not logged in"}
        <br />
        <GoogleLogin
          clientId="change_me"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy="single_host_origin"
        />
        <br />
        <br />
        <br />
        <br />
        <input
          value={this.newMessage}
          onChange={e => this.setState({ newMessage: e.target.value })}
        />
        <button onClick={this.send}>send message</button>

        {this.state.messages.map(message => {
          return (
            <p key={message.id}>
              <strong>{message.user.nickname}: </strong>
              {message.body}
            </p>
          );
        })}
      </div>
    );
  }
}

export default App;
