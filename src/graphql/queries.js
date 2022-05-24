import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql'
import { User } from '../models'
import { UserType } from './typesDef'

export const users = {
  type: new GraphQLList(UserType),
  description: 'Return list of users',
  resolve: async () => User.find({})
}

export const user = {
  type: UserType,
  description: 'Get a user by id',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (_, { id }) => await User.findById(id)
}
