'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Credentials',{
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true

    },
    Username: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    Password: {
        type: Sequelize.STRING(20),
        allowNull: false
    },


    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
