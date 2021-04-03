'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('clientinformations','Name',{
      type:Sequelize.STRING(50),
        allowNull: true,
    })])
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
