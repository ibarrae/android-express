const environment = require('../src/utils/environment.ts')
const Sequelize = require('sequelize')

module.exports = {
  development: {
    username: environment.dbUser,
    password: environment.dbPassword,
    database: environment.dbName,
    host: environment.dbHost,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op
  }
}
