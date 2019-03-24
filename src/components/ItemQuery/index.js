import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import GraphQLData from '../../lib/GraphQLData';

const ItemFieldQuery = gqlLoader('./query.graphql');

const ItemQuery = ({itemQuery}) => {
  const { item } = itemQuery;

  return (
    <div>Item name: <strong>{item && item.name}</strong></div>
  );
};

export default GraphQLData(ItemFieldQuery, { name: 'itemQuery', options: { variables: { path: "/sitecore/content/Home/aa/Sample Item" } } })(ItemQuery);