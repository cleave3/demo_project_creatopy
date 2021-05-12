import 'graphql-import-node'
import userTypeDefs from './schemas/user.graphql'
import itemTypeDefs from './schemas/item.graphql'
import defaultTypeDefs from './schemas/default.graphql'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolversMap'
import { GraphQLSchema } from 'graphql'

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [defaultTypeDefs, userTypeDefs, itemTypeDefs],
    resolvers
})

export default schema;
