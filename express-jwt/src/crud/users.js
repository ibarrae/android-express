import { User } from '../models/user'

export const findAllUsers = () => (
  User.findAll({ raw: true })
)

export const findByUsernameAndPassword = ({ name, pass }) => (
  User.findOne({
    where: {
      username: name,
      password: pass
    },
    raw: true,
    attributes: ['id']
  }).then(user => user !== null ? user : null)
)

export const findById = (id) => (
  User.findById(id, { raw: true }).then(user => user !== null ? user : null)
)
