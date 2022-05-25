import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import { Post, User, Comment } from '../models'

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
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async root => await User.findById(root.userId)
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async root => await Comment.find({ postId: root.id })
    }
  })
})

/**
 * Custom type for Comment
 */
export const CommentType = new GraphQLObjectType({
  name: 'CommentType',
  description: 'The comment types',
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async root => await User.findById(root.userId)
    },
    post: {
      type: PostType,
      resolve: async root => await Post.findById(root.postId)
    }
  }
})
