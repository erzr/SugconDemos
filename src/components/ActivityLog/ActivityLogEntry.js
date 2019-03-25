import React from 'react';
import { Badge } from 'react-bootstrap';
import TimeAgo from 'react-timeago'

const ActivityLogEntry = ({ entry }) => (
    <tr>
        <td><TimeAgo date={entry.timestamp} /></td>
        <td>
            {entry.isAdd && <Badge variant="success">Item Added</Badge>}
            {entry.isDelete && <Badge variant="danger">Item Deleted</Badge>}
            {entry.isSave && <Badge variant="primary">Item Saved</Badge>}
        </td>
        <td>{entry.item.name}</td>
        <td>
            {!entry.changes && <span>n/a</span>}
            {entry.changes && <span>{entry.changes.join(', ')}</span>}
        </td>
    </tr>
);

export default ActivityLogEntry;