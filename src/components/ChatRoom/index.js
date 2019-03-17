import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Form, Button } from 'react-bootstrap';
import { Subscription, Mutation, Query } from "react-apollo";

const ConnectedDemoQuery = gqlLoader('./query.graphql');
const CreateMessageQuery = gqlLoader('./createquery.graphql');
const MessageQuery = gqlLoader('./messagequery.graphql');

const ChatRoomMessage = ({ message }) => {
  return (
    <Query query={MessageQuery} variables={ {path: message.id} }>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return (
        <div>{data.item.message.value}</div>
      );
    }}
    </Query>
  );
};

class ChatRoom extends React.Component {

  constructor(props) {
    super(props);

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleAddMessageCompleted = this.handleAddMessageCompleted.bind(this);

    this.state = {
      items: [],
      message: '',
      submitDisabled: false
    }
  }

  isValidChatMessage(data) {
    if (data && !this.state.items.find((item) => item.id === data.itemAdded.id)) {
      return true;
    }

    return false;
  }

  handleMessageSubmit(e, addMessage) {
    e.preventDefault();

    if (!this.state.message) {
      return;
    }

    this.setState({
      submitDisabled: true
    });

    var message = this.state.message;

    addMessage({
      variables: {
        name: "Message" + new Date().getTime(),
        parent: this.props.rendering.dataSource,
        message: message
      }
    });
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleAddMessageCompleted() {
    this.setState({
      submitDisabled: false,
      message: ''
    });
  }

  render() {
    return <div>
      <Subscription
        subscription={ConnectedDemoQuery}>
        {({ loading, error, data }) => {
          if (data && this.isValidChatMessage(data)) {
            this.setState({
              items: [...this.state.items, data.itemAdded]
            })
          }
          return null;
        }}
      </Subscription>

      {this.state.items.map((item, index) => {
        return <ChatRoomMessage key={index} message={item} />
      })}

      <Mutation mutation={CreateMessageQuery} ignoreResults={true} onCompleted={this.handleAddMessageCompleted}>
        {(addMessage, { data }) => (
          <Form onSubmit={(e) => {
            this.handleMessageSubmit(e, addMessage);
          }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Message</Form.Label>
              <Form.Control type="text" placeholder="Enter message"
                value={this.state.message} onChange={this.handleMessageChange}
                disabled={this.state.submitDisabled} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={this.state.submitDisabled}>
              Submit
        </Button>
          </Form>
        )}
      </Mutation>
    </div>
  }

}

export default ChatRoom;
