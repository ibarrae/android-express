import auth from 'basic-auth'
import { findByUsernameAndPassword } from '../crud/users'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../utils/environment'

export const login = (req, res) => {
  const credentials = auth(req)
  if (!credentials) {
    res.status(400).end('Bad request.')
  } else {
    findByUsernameAndPassword(credentials)
      .then(user => handleLogin(user, res))
  }
}

const handleLogin = (user, res) => {
  if (user === null) {
    res.status(401).send('Provided credentials are wrong')
  } else {
    const token = { token: jwt.sign({ user }, jwtSecret) }
    res.status(200).json(token)
  }
}
