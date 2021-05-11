import { buildSchema } from "graphql";

const schema = buildSchema(`
    type User {
        id: String!
        name: String!
        email: String!
        password: String!
        items: [Item!]
        createdAt: String!
        updateAt: String!
    }

    input RegisterInput {        
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {  
        email: String!
        password: String!
    }

    type LoginResponse {
        id: String!
        name: String!
        email: String!
        token: String!
    }

    type Item {
        id: Int!
        title: String!
        creator: User!
        createdAt: String!
        updateAt: String!
    }

    input ItemInput {
        title: String!
        user_id: String!
    }

    type ItemResponse {
        id: Int!
        title: String!
        creator: User!
    }

    type Query {
    }
    
    type Mutation {
        register(input: RegisterInput!): String
        login(input: LoginInput!): LoginResponse
        addItem(input: ItemInput): ItemResponse
    }
`)

export default schema;