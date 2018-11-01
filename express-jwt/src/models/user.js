import { withDB, stringType, usersTable } from './utils'

export const User = withDB.define(usersTable, {
  name: stringType,
  password: stringType,
  username: stringType
}, {})
