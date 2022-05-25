import { GraphQLError, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql'
import { Comment, Post, User } from '../models'
import { CommentType, PostType, UserType } from './typesDef'

/**
 * Get a users list
 */
export const users = {
  type: new GraphQLList(UserType),
  description: 'Return list of users',
  resolve: async () => User.find({})
}

/**
 * Get user by id
 */
export const user = {
  type: UserType,
  description: 'Get a user by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }) => await User.findById(id)
}

/**
 * Get posts list
 */
export const posts = {
  type: new GraphQLList(PostType),
  description: 'Get a posts list',
  resolve: async () => await Post.find({})
}

/**
 * Get post by id
 */
export const post = {
  type: PostType,
  description: 'Get post by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }) => await Post.findById(id)
}

/**
 * Get comments list
 */
export const comments = {
  type: new GraphQLList(CommentType),
  description: 'Get comments list',
  resolve: async () => await Comment.find({})
}

/**
 * Get comment by id
 */
export const comment = {
  type: CommentType,
  description: 'Get comment by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }, { verifiedUser }) => {
    if (!verifiedUser) new GraphQLError('Unauthorizated')
    return await Comment.findById(id)
  }
}
