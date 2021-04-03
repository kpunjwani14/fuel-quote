'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('user_credentials','Username',{
      type: Sequelize.STRING(50),
        allowNull: false,
    }),queryInterface.changeColumn('user_credentials','Password',{
      type: Sequelize.STRING(20),
        allowNull: false,
    }),queryInterface.renameColumn('user_credentials','id','UserId')])
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
