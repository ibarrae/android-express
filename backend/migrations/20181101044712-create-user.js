module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('jwt_users', {
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
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('jwt_users')
  }
}
