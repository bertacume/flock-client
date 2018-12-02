import gql from "graphql-tag";

const FACEBOOK = gql` mutation facebook ($firstName: String!, $lastName: String!, $email: String!, $accessToken: String!, $userID: String!, $avatarURL: String )
  {
    facebook (user: { firstName: $firstName, lastName: $lastName, avatarURL: $avatarURL}, email : $email, userID : $userID, accessToken : $accessToken )
  }
`;

export default FACEBOOK;