import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { helloWorld } from './queries'

/**
 * Define Queries
 */
const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: {
    helloWorld
  }
})

/**
 * Define Mutations
 */
const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {}
})

/**
 * Define Schema
 * Un *Schema* es un objeto que tiene listada todas las *queries* y *mutations* que podemos hacer
 */
export default new GraphQLSchema({
  query: QueryType
  // mutation: MutationType
})
