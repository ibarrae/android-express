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
  User.findByPk(id, { raw: true }).then(user => user !== null ? user : null)
)

export const createUser = (data) => (
  User.create({ ...data, created_at: Date.now() })
)

export const updateUser = (id, data) => (
  User.update({ updated_at: Date.now(), ...data }, { where: { id } })
)

export const deleteUser = (id) => (
  User.destroy({ where: { id } })
)
