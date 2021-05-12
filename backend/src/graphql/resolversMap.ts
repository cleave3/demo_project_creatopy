import { IResolvers } from 'graphql-tools'
import { merge } from 'lodash'
import { UserResolvers } from './resolvers/user';
import { ItemResolvers } from './resolvers/item';
import GraphQLDateTime from 'graphql-type-datetime';

const resolverMap: IResolvers = merge(UserResolvers, ItemResolvers, { DateTime: GraphQLDateTime });

export default resolverMap
