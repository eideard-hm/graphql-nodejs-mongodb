import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { user, users } from './queries'
import { login, register } from './mutations'

/**
 * Define Queries
 */
const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: {
    user,
    users
  }
})

/**
 * Define Mutations
 */
const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    login,
    register
  }
})

/**
 * Define Schema
 * Un *Schema* es un objeto que tiene listada todas las *queries* y *mutations* que podemos hacer
 */
export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
})
