import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Subscription } from "react-apollo";

const ConnectedDemoQuery = gqlLoader('./query.graphql');

class ActivityLog extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubscriptionData = this.handleSubscriptionData.bind(this);
    
    this.state = {
      items: []
    }
  }

  handleSubscriptionData(update) {
    var data = update.subscriptionData.data;
    if (data && !this.state.items.find((item) => item.id === data.itemAdded.id)) {
      this.setState({
        items: [...this.state.items, data.itemAdded]
      })
    }
  }

  render() {
    return <div>
      <Subscription subscription={ConnectedDemoQuery} onSubscriptionData={this.handleSubscriptionData}></Subscription>

      {this.state.items.map((item, index) => {
        return <div>{item.name}</div>
      })}
    </div>
  }

}

export default ActivityLog;
