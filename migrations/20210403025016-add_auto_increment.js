'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('user_credentials','UserId',{autoIncrement:true, primaryKey:true,dataType:Sequelize.INTEGER})])
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
