import React from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-react';
import { loader as gqlLoader } from 'graphql.macro';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ItemFieldQuery = gqlLoader('./query.graphql');

// const ItemFieldQuery = gql`
//   query MessageQuery($path:String!){
//     item(path:$path) {
//       id
//       name
//     }
//   }
// `;

const ItemQuery = () => {
  return (
    <Query query={ItemFieldQuery} variables={{ path: "/sitecore/content/Home/aa/Sample Item" }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        return (
          <div>{data.item.name}</div>
        );
      }}
    </Query>
  );
};

export default ItemQuery;
