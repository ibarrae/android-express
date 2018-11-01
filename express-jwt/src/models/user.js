import { withDB, stringType, usersTable, dateType } from './utils'

export const User = withDB.define(usersTable, {
  name: stringType,
  username: stringType,
  password: stringType,
  created_at: dateType,
  updated_at: dateType
}, { timestamps: false })
