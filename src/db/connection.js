import { connect } from 'mongoose'

import { DB_NAME, DB_PASSWORD, DB_USER, MONGO_URI } from '../config/config'

const connection = async () => {
  try {
    const conn = await connect(MONGO_URI, {
      user: DB_USER,
      pass: DB_PASSWORD,
      dbName: DB_NAME
    })
    console.log(`Conected to database ${conn.connection.db.databaseName}`)
  } catch (error) {
    console.error(error)
  }
}

export default connection
