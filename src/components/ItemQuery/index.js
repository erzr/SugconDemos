import React from 'react';
import { loader as gqlLoader } from 'graphql.macro';
import GraphQLData from '../../lib/GraphQLData';
import '../../assets/itemquery.css';

const ItemFieldQuery = gqlLoader('./query.graphql');

const ItemQuery = ({ itemQuery }) => {
  const { item } = itemQuery;

  return <div className="marquee">
    <div>
      <span>{item && item.name}</span>
    </div>
  </div>
};

export default GraphQLData(ItemFieldQuery, { name: 'itemQuery', options: { variables: { path: "/sitecore/content/Home" } } })(ItemQuery);