import dotenv from 'dotenv'
import Sequelize from 'sequelize'
import { dbName, dbUser, dbPassword, dbHost } from '../utils/environment'

dotenv.config()

export const withDB = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'postgres',
  host: dbHost
})

export const usersTable = 'jwt_users'

export const stringType = Sequelize.STRING
