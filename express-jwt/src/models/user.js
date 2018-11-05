import { withDB, stringType, dateType, usersTable } from './utils'

export const User = withDB.define(usersTable, {
  name: stringType,
  username: stringType,
  password: stringType,
  created_at: dateType
}, { timestamps: false })
