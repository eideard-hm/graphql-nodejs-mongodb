import { GraphQLNonNull, GraphQLString } from 'graphql'

import { Post, User } from '../models'
import { generateJwtToken } from '../utils/auth'
import { comparePassword, encryptPassword } from '../utils/bcrypt'
import { PostType } from './typesDef'

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
