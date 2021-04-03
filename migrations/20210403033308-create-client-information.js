'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClientInformations', {
      ClientId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false

      },
      UserId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:{
            tableName:'user_credentials',

          },
          key:'UserId'
        }
      },
      Name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      Address1: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      Address2: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      City: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      State: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      ZipCode: {
        type: Sequelize.STRING(10),
        allowNull: false
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
    await queryInterface.dropTable('ClientInformations');
  }
};