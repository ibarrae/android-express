import { User } from '../models/user'

export const findAllUsers = () => {
  User.findAll().then(users => console.log(users))
}
