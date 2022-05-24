import { config } from 'dotenv'

config()

export const PORT = process.env.PORT || 4200
export const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey1234'
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
export const DB_NAME = process.env.DB_NAME || 'tests'
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
