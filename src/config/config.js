import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 4200
export const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test'
