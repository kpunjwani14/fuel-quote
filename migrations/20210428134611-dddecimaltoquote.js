'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.changeColumn('fuelquotes','SuggestedPrice',{
      type:Sequelize.DECIMAL(10,2)
    })
    queryInterface.changeColumn('fuelquotes','TotalPrice',{
      type:Sequelize.DECIMAL(10,2)
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
