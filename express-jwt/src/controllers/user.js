import {
  findAllUsers,
  findById
} from '../crud/users'

export const usersController = (_req, res) => {
  findAllUsers().then(users => res.status(200).json(users))
}

export const getUserController = (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).send('Bad request.')
  } else {
    findById(id).then(user => handleGetUser(user, res))
  }
}

const handleGetUser = (user, res) => {
  if (user === null) {
    res.status(404).end()
  } else {
    res.status(200).json(user)
  }
}
