import gql from "graphql-tag";

const REGISTER = gql` mutation register ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $avatarURL: String )
  {
    register (user: { firstName: $firstName, lastName: $lastName, avatarURL: $avatarURL}, email: $email, password: $password )
  }
`;

export default REGISTER;