import { withDB, stringType, dateType, usersTable } from "./utils";
import { Instance } from "sequelize";

export interface UserAttributes {
  name: string;
  username: string;
  password: string;
  created_at: number;
  updated_at: number;
}

export type UserInstance = Instance<UserAttributes> & UserAttributes;

export const User = withDB.define<UserInstance, UserAttributes>(
  usersTable,
  {
    name: stringType,
    username: stringType,
    password: stringType,
    created_at: dateType,
    updated_at: dateType
  },
  { timestamps: false }
);
