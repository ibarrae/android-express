import { withDB, usersTable } from "./utils";
import { STRING, DATE, Model } from "sequelize";
import { BuildOptions } from "sequelize";

export interface UserAttributes {
  name: string;
  username: string;
  password: string;
  created_at: number;
  updated_at: number;
}

export class DbUser extends Model {
  public name!: string;
  public username!: string;
  public password!: string;
  public created_at!: number;
  public updated_at!: number;
}

DbUser.init(
  {
    name: STRING,
    username: STRING,
    password: STRING,
    created_at: DATE,
    updated_at: DATE
  },
  { sequelize: withDB, tableName: usersTable, timestamps: false }
);
