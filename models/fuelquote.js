'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FuelQuote extends Model {
   
    
  };
  FuelQuote.init({
    QuoteId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true
    },
    ClientId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      
    },
    Gallons: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    DeliveryAddress:{
      type:DataTypes.STRING(50),
      allowNull:false
    },
    SuggestedPrice:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    TotalPrice:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    DeliveryDate: {
      type: DataTypes.DATE,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'FuelQuote',
  });
  
  
  return FuelQuote;
};