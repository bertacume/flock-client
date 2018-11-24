import { Query } from "react-apollo";
import gql from "graphql-tag";
import React, { Component } from 'react';

const UserApollo = () => (
  <Query
  query={gql`
    {
      User (id:1) { firstName }
    }
  `}
  errorPolicy="all"
>
  {({ loading, error, data }) => {
    if (loading) return <p>Loading...</p>;
    return (
      <div>
        <h1>{data.User.firstName}</h1>
      </div>
    );
  }}
</Query>
);

export default UserApollo;