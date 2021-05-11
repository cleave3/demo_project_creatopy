import 'graphql-import-node'
import * as userTypeDefs from './schemas/user.graphql'
import * as itemTypeDefs from './schemas/item.graphql'
import * as defaultTypeDefs from './schemas/default.graphql'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolversMap'
import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [defaultTypeDefs, userTypeDefs, itemTypeDefs],
    resolvers
})

export default schema;
