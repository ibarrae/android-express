const utils = require('../src/models/utils')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(utils.usersTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable(utils.usersTable)
  }
}
