import { GraphQLString } from 'graphql'

const helloWorld = {
  type: GraphQLString,
  description: 'Returns a hello world string',
  resolve: () => 'Hello World'
}

export { helloWorld }
