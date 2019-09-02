import dotenv from "dotenv";
import Sequelize from "sequelize";
import { dbName, dbUser, dbPassword, dbHost } from "../utils/environment";

dotenv.config();

export const withDB =
  process.env.NODE_ENV === "test"
    ? new Sequelize("test", "postgres", "", {
        dialect: "postgres",
        host: "127.0.0.1",
        logging: false,
        operatorsAliases: true
      })
    : new Sequelize(dbName, dbUser, dbPassword, {
        dialect: "postgres",
        host: dbHost,
        operatorsAliases: true
      });

export const usersTable = "jwt_users";

export const stringType = Sequelize.STRING;
export const dateType = Sequelize.DATE;
