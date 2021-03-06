import { verify } from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config'

export const authenticate = (req, res, next) => {
  try {
    // get token from request
    const token = req.headers?.authorization?.split(' ')[1]
    // verify token and extract user data
    const verified = verify(token, SECRET_KEY)
    req.verifiedUser = verified
    next()
  } catch (error) {
    next()
    // return res
    //   .status(401)
    //   .send({ message: 'Unauthorized user', error: error.message })
  }
}
