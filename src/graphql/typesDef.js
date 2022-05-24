import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql'

/**
 * Custom type for User
 */
export const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'The user type',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
})

/**
 * Custom type for Post
 */
export const PostType = new GraphQLObjectType({
  name: 'PostType',
  description: 'The post type',
  fields: {
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  }
})
