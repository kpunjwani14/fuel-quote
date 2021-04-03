'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FuelQuotes', {
     
      QuoteId: {
        tallowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClientId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'clientinformations',

          },
          key:'ClientId'
        }
      },
      Gallons: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      DeliveryAddress:{
        type:Sequelize.STRING(50),
        allowNull:false
      },
      SuggestedPrice:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      TotalPrice:{
        type:Sequelize.INTEGER,
        allowNull:false
      },
      DeliveryDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FuelQuotes');
  }
};