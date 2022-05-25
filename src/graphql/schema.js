import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import { comment, comments, user, users, post, posts } from './queries'
import {
  addComment,
  createPost,
  deletePost,
  updatePost,
  login,
  register
} from './mutations'

/**
 * Define Queries
 */
const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: {
    comment,
    comments,

    user,
    users,

    post,
    posts
  }
})

/**
 * Define Mutations
 */
const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    addComment,

    createPost,
    updatePost,
    deletePost,

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
