import React from 'react';
import ChatRoomMessage from './ChatRoomMessage';

let ChatRoomMessages = ({items, username}) => (
  <div class="chat-messages">
    <ul>
      {items.map((item, index) => {
        return <ChatRoomMessage key={index} message={item} username={username} />
      })}
    </ul>
  </div>
);

export default ChatRoomMessages;