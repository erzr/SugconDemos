import React from 'react';
import gql from 'graphql-tag';
import { Subscription } from "react-apollo";
import { Table } from 'react-bootstrap';

const ConnectedDemoQuery = gql`
subscription
{
  itemAdded {
    id
    name
  }
}
`;

class ActivityLog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  render() {
    return <div>
      <Subscription
        subscription={ConnectedDemoQuery}>
        {({ loading, error, data }) => {
          if (data && !this.state.items.find((item) => item.id === data.itemAdded.id)) {
            this.setState({
              items: [...this.state.items, data.itemAdded]
            })
          }
          return null;
        }}
      </Subscription>

      {this.state.items.map((item, index) => {
        return <div>{item.name}</div>
      })}
    </div>;
  }

}

export default ActivityLog;
