import React from 'react';
import GraphQLData from '../../lib/GraphQLData';
import {compose} from 'react-apollo';
import gql from 'graphql-tag';

const FIRST_QUERY = gql`
  query FirstQuery {
    item {
      name
    }
  }
`;

const SECOND_QUERY = gql`
  query SecondQuery {
    item (path:"/sitecore/content/home") {
      name
    }
  }
`;

const MultipleQueries = ({firstQuery, secondQuery}) => {
  return (
    <div>
      <h2>MultipleQueries Component</h2>
      <p>First Item Name: <strong>{firstQuery.item && firstQuery.item.name}</strong></p>
      <p>Second Item Name: <strong>{secondQuery.item && secondQuery.item.name}</strong></p>
    </div>
  );
}

export default compose(GraphQLData(FIRST_QUERY, { name: "firstQuery" }), GraphQLData(SECOND_QUERY, { name: "secondQuery" }))(MultipleQueries);