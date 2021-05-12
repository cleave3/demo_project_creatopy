import { gql } from "apollo-server-express"

export default gql`
scalar JSON
scalar JSONObject

type Query {
  _empty: String
}

type Mutation {
  _empty: String
}`;
