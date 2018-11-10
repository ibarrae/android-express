const environment = require('../src/utils/environment')

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
    dialect: 'postgres'
  }
}
