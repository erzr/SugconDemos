import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Subscription } from "react-apollo";

const ConnectedDemoQuery = gqlLoader('./query.graphql');

let ChatRoomSubscription = ({ onChatMessage }) => {

    const handleSubscriptionData = ({subscriptionData}) => {
        var data = subscriptionData.data;
        if (data) {
            onChatMessage(data.itemAdded);
        }
    };

    return (
        <Subscription subscription={ConnectedDemoQuery} onSubscriptionData={handleSubscriptionData}></Subscription>
    );

};

export default ChatRoomSubscription;