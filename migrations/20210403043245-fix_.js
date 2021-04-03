'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.changeColumn('clientinformations','Name',{
      type:Sequelize.STRING(50),
        allowNull: true,
    }),queryInterface.changeColumn('clientinformations','Address1',{
      type:Sequelize.STRING(50),
        allowNull: true,
    }),queryInterface.changeColumn('clientinformations','City',{
      type:Sequelize.STRING(30),
        allowNull: true,
    }),queryInterface.changeColumn('clientinformations','State',{
      type:Sequelize.STRING(2),
        allowNull: true,
    }),queryInterface.changeColumn('clientinformations','ZipCode',{
      type:Sequelize.STRING(10),
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
