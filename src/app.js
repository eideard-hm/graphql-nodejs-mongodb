import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'

import schema from './graphql/schema'
import { authenticate } from './middlewares/auth'

const app = express()

// define middlewares
app.use(authenticate)

// define cors
app.use(cors())

// define entrypoints
app.get('/', (_, res) => res.send({ msg: 'Welcome. Go to /graphql' }))

/**
 * En graphQL no necesitamos crear multiples rutas; solo necesitamos una
 * sola ruta que es la que va a procesar todas nuestras consultas
 */
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

export default app
