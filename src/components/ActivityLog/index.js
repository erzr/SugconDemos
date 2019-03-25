import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Subscription } from "react-apollo";
import gql from 'graphql-tag';
import { Table } from 'react-bootstrap';
import ActivityLogEntry from './ActivityLogEntry';

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
          isAdd: true,
          item: data.itemAdded,
          timestamp: Date.now()
        };
      } else if (data.itemDeleted) {
        entry = {
          isDelete: true,
          item: data.itemDeleted,
          timestamp: Date.now()
        };
      } else if (data.itemSaved) {
        entry = {
          isSave: true,
          item: data.itemSaved.item,
          changes: [],
          timestamp: Date.now()
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
          items: [entry, ...this.state.items]
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
            <th>Time</th>
            <th>Type</th>
            <th>Name</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((entry, index) => {
            return <ActivityLogEntry entry={entry} key={index} />
          })}
        </tbody>
      </Table>
    </div>
  }

}

export default ActivityLog;
