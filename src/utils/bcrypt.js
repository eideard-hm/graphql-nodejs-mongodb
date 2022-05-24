import { compareSync, genSaltSync, hashSync } from 'bcrypt'

export const encryptPassword = password => {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}

export const comparePassword = (password, hash) => {
  return compareSync(password, hash)
}
