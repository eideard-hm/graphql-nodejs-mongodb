import { MONGO_URI } from '../config/config'

const { connect } = require('mongoose')

const connection = async () => {
  try {
    const conn = await connect(MONGO_URI)
    console.log(`Conected to database ${conn.connection.db.databaseName}`)
  } catch (error) {
    console.error(error)
  }
}

export default connection
