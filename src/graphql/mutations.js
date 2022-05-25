import { GraphQLError, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'

import { Comment, Post, User } from '../models'
import { generateJwtToken } from '../utils/auth'
import { comparePassword, encryptPassword } from '../utils/bcrypt'
import { CommentType, PostType } from './typesDef'

/**
 * Mutation create new User
 */
export const register = {
  type: GraphQLString,
  description: 'Create a new User and return a Json Web Token',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, user) => {
    // hash password before save in database
    user.password = encryptPassword(user.password)
    // persistir en la base de datos
    const newUser = await User.create(user)
    //generate JWT token and return its value
    return generateJwtToken({
      _id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      displayName: newUser.displayName
    })
  }
}

/**
 * Mutation login
 */
export const login = {
  type: GraphQLString,
  description: 'Verify user identity and return Json Web Token',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, { email, password }) => {
    // find user by email
    const user = await User.findOne({ email })
    if (!user) throw new Error('User Not Found')
    // compare passwords
    const validPassword = comparePassword(password, user.password)
    if (!validPassword) throw new Error('Invalid Password')

    //generate JWT token and return its value
    return generateJwtToken({
      _id: user._id,
      email: user.email,
      username: user.username,
      displayName: user.displayName
    })
  }
}

/**
 * Mutation for create post
 */
export const createPost = {
  type: PostType,
  description: 'Create new post',
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (_, post, { verifiedUser }) =>
    await Post.create({ ...post, userId: verifiedUser._id })
}

/**
 * Mutation for update post
 */
export const updatePost = {
  type: PostType,
  description: 'Update post',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
  },
  resolve: async (_, post, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('Unauthorizated')

    return await Post.findOneAndUpdate(
      {
        _id: post.id,
        userId: verifiedUser._id
      },
      post,
      {
        new: true,
        timestamps: true,
        runValidators: true
      }
    )
  }
}

/**
 * Mutation for delete post
 */
export const deletePost = {
  type: GraphQLString,
  description: 'Delete one post',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error('Unauthorizated')
    const postDeleted = await Post.findOneAndDelete(
      {
        _id: id,
        userId: verifiedUser._id
      },
      {
        new: true,
        runValidators: true
      }
    )
    if (!postDeleted) throw new Error(`The post with Id: ${id} not found!`)

    return `The post ${postDeleted.title} has been successfully deleted!`
  }
}

/**
 * Mutation for create comment
 */
export const addComment = {
  type: CommentType,
  description: 'Add new comment',
  args: {
    comment: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, comment, { verifiedUser }) => {
    if (!verifiedUser) new GraphQLError('Unauthorizated')
    return await Comment.create({ ...comment, userId: verifiedUser._id })
  }
}

/**
 * Mutation for update comment
 */
export const updateComment = {
  type: CommentType,
  description: 'Update comment',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: GraphQLString }
  },
  resolve: async (_, comment, { verifiedUser }) => {
    if (!verifiedUser) new GraphQLError('Unauthorizated')
    return await Comment.findOneAndUpdate(
      {
        _id: comment.id,
        userId: verifiedUser._id
      },
      comment,
      {
        new: true,
        timestamps: true,
        runValidators: true
      }
    )
  }
}

/**
 * Delete comment
 */
export const deleteComment = {
  type: GraphQLString,
  description: 'Delete comment',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }, { verifiedUser }) => {
    if (!verifiedUser) new GraphQLError('Unauthorizated')
    const commentDeleted = await Comment.findOneAndDelete({
      _id: id,
      userId: verifiedUser._id
    })
    if (!commentDeleted) new GraphQLError(`The comment${id} not found`)
    return `The comment ${id} has been successfully deleted`
  }
}
