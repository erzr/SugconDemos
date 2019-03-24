import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Subscription } from "react-apollo";
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';

const ADDED_QUERY = gql`
  subscription
  {
    itemAdded {
      name
    }
  }
`;

const DELETED_QUERY = gql`
  subscription
  {
    itemDeleted {
      name
    }
  }
`;

const SAVED_QUERY = gql`
  subscription
  {
    itemSaved {
      item {
        name
      }
      changes {
        fieldChanges {
          fieldName
        }
      }
    }
  }
`;

class ActivityLog extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubscriptionData = this.handleSubscriptionData.bind(this);

    this.state = {
      items: []
    }
  }

  handleSubscriptionData(update) {
    const data = update.subscriptionData.data;

    if (data) {

      let entry = null;

      if (data.itemAdded) {
        entry = {
          type: 'Added',
          item: data.itemAdded
        };
      } else if (data.itemDeleted) {
        entry = {
          type: 'Deleted',
          item: data.itemDeleted
        };
      } else if (data.itemSaved) {
        entry = {
          type: 'Saved',
          item: data.itemSaved.item,
          changes: []
        }

        if (data.itemSaved.changes && data.itemSaved.changes.fieldChanges) {
          data.itemSaved.changes.fieldChanges.forEach((item) => {
            if (item.fieldName.indexOf("__") < 0) { 
              entry.changes.push(item.fieldName)
            }
          });

          if (!entry.changes.length) {
            entry.changes.push("Only system fields changed.")
          }
        }
      }

      if (entry) {
        this.setState({
          items: [...this.state.items, entry]
        })
      }
    }
  }

  render() {
    return <div>
      <Subscription subscription={ADDED_QUERY} onSubscriptionData={this.handleSubscriptionData}></Subscription>
      <Subscription subscription={DELETED_QUERY} onSubscriptionData={this.handleSubscriptionData}></Subscription>
      <Subscription subscription={SAVED_QUERY} onSubscriptionData={this.handleSubscriptionData}></Subscription>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((entry, index) => {
            return <tr>
              <td>{entry.type}</td>
              <td>{entry.item.name}</td>
              <td>
                {!entry.changes && <span>n/a</span>}
                {entry.changes && <span>{entry.changes.join(', ')}</span>}
              </td>
            </tr>
          })}
        </tbody>
      </Table>
    </div>
  }

}

export default ActivityLog;
