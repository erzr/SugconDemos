import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import { Subscription } from "react-apollo";

const ConnectedDemoQuery = gqlLoader('./query.graphql');

let ChatRoomSubscription = ({ onChatMessage }) => (
    <Subscription subscription={ConnectedDemoQuery}>
        {({ data }) => {
            if (data) {
                onChatMessage(data.itemAdded);
            }
            return null;
        }}
    </Subscription>
);

export default ChatRoomSubscription;