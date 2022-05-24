import { sign } from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config'

export const generateJwtToken = user => {
  return sign({ ...user }, SECRET_KEY, {
    expiresIn: '2h'
  })
}
