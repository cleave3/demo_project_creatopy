import { IResolvers } from 'graphql-tools'
import { merge } from 'lodash'
import { UserResolvers } from './resolvers/user';
import { ItemResolvers } from './resolvers/item';


const resolverMap: IResolvers = merge(UserResolvers, ItemResolvers);

export default resolverMap
