import React from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

class ChatUsernameForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);

        this.state = {
            username: ''
        };
    }

    handleUsernameSubmit(e) {
        e.preventDefault();

        if (!this.state.username) {
            return;
        }

        var username = this.state.username;

        this.props.onSetUsername(username);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    render() {
        return (
            <Form onSubmit={(e) => { this.handleUsernameSubmit(e) }}>
                <InputGroup className="mb-3" size="lg">
                    <FormControl type="text" placeholder="Enter username"
                        value={this.state.username} onChange={this.handleUsernameChange} />
                    <InputGroup.Append>
                        <Button variant="secondary" type="submit">Submit</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        );
    }

}

export default ChatUsernameForm;