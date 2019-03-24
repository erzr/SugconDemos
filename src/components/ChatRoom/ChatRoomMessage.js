import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Query } from "react-apollo";

const MessageQuery = gqlLoader('./messagequery.graphql');

const ChatRoomMessage = ({ message, username }) => {
  return (
    <Query query={MessageQuery} variables={{ path: message.id }}>
      {({ loading, error, data }) => {
        if (loading) return <li></li>;

        return (
          <li className={username == data.item.username.value ? "me" : "them"}>{data.item.message.value}</li>
        );
      }}
    </Query>
  );
};

export default ChatRoomMessage;