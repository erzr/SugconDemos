import React from 'react';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomForm from './ChatRoomForm';
import ChatRoomSubscription from './ChatRoomSubscription';
import ChatUsernameForm from './ChatUsernameForm';

import '../../assets/chat.css';

class ChatRoom extends React.Component {

  constructor(props) {
    super(props);

    this.handleChatMessage = this.handleChatMessage.bind(this);
    this.handleSetUsername =  this.handleSetUsername.bind(this);

    this.state = {
      items: [],
      username: ''
    }
  }

  isValidChatMessage(data) {
    if (data && !this.state.items.find((item) => item.id === data.id)) {
      return true;
    }

    return false;
  }

  handleChatMessage(data) {
    if (data && this.isValidChatMessage(data)) {
      this.setState({
        items: [...this.state.items, data]
      })
    }
  }

  handleSetUsername(username) {
    this.setState({
      username: username
    });
    this.forceUpdate();
  }

  render() {
    return <div className="chat">
      {this.state.username &&
        <React.Fragment>
          <ChatRoomSubscription onChatMessage={this.handleChatMessage} />

          <ChatRoomMessages items={this.state.items} username={this.state.username} />

          <ChatRoomForm rendering={this.props.rendering} username={this.state.username} />
        </React.Fragment>
      }
      {!this.state.username && <ChatUsernameForm onSetUsername={this.handleSetUsername} />}
    </div>
  }

}

export default ChatRoom;
