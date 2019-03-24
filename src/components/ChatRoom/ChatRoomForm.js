import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Mutation } from "react-apollo";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const CreateMessageQuery = gqlLoader('./createquery.graphql');

class ChatRoomForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleAddMessageCompleted = this.handleAddMessageCompleted.bind(this);

        this.state = {
            message: '',
            submitDisabled: false
        };
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
                message: message,
                username: this.props.username
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
        return (
            <Mutation mutation={CreateMessageQuery} ignoreResults={true} onCompleted={this.handleAddMessageCompleted}>
                {(addMessage, { data }) => (
                    <Form onSubmit={(e) => { this.handleMessageSubmit(e, addMessage) }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                type="text" placeholder="Enter message"
                                value={this.state.message} onChange={this.handleMessageChange}
                                disabled={this.state.submitDisabled} />
                            <InputGroup.Append>
                                <Button variant="secondary" type="submit" disabled={this.state.submitDisabled}>Submit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                )}
            </Mutation>
        );
    }

}

export default ChatRoomForm;