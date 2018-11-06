import {
  findAllUsers,
  findById,
  createUser,
  updateUser,
  deleteUser
} from '../crud/users'

export const getAllUsersController = (_req, res) => {
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

export const createUserController = (req, res) => {
  const data = req.body
  if (!data || Object.keys(data).length === 0) {
    res.status(400).send('Bad request.')
  } else {
    createUser(data).then(user => res.status(201).json({
      message: 'User created.',
      user
    }))
  }
}

export const updateUserController = (req, res) => {
  const id = req.params.id
  const data = req.body
  if (!id) {
    res.status(400).send('Bad request.')
  } else if (!data || Object.keys(data).length === 0) {
    res.status(400).end()
  } else {
    updateUser(id, req.body).then(rows =>
      handleAffectedRows(rows[0], res, 'User updated.')
    )
  }
}

export const deleteUserController = (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).end()
  } else {
    deleteUser(id).then(rows =>
      handleAffectedRows(rows, res, 'User deleted.')
    )
  }
}

const handleAffectedRows = (rows, res, message) => {
  if (rows === 0) {
    res.status(404).end()
  } else {
    res.status(200).json({ message })
  }
}
