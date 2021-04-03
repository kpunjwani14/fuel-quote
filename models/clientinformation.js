const UserCredentials = require('./UserCredentials')
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ClientInformation.init({
    ClientId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false

    },
    UserId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    Name: {
      type:DataTypes.STRING(50),
      allowNull:true
    },
    Address1: {
      type:DataTypes.STRING(50),
      allowNull:true
    },
    Address2: {
      type:DataTypes.STRING(50),
      allowNull:true
    },
    City: {
      type:DataTypes.STRING(30),
      allowNull:true
    },
    State: {
      type:DataTypes.STRING(2),
      allowNull:true
    },
    ZipCode: {
      type:DataTypes.STRING(10),
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'ClientInformation',
  });
  ClientInformation.associate(models =>
    ClientInformation.hasOne(models.UserCredentials,{
    name:'UserId',
    allowNull:false
  })
  )
  return ClientInformation;
};