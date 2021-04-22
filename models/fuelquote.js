'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FuelQuote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    constructor(_location, _history, _amount){
      if (_location == true) {       // if in Texas
          this.location = .02;
      } else{
          this.location = .04;
      }
      
      if (_history == true) {       // if they are a prev customer  
          this.history = .01;
      } else {
          this.history = 0;
      }

      this.galAmount = _amount
      if (_amount > 1000) {       // if they are a prev customer  
          this.amount = .02;
      } else {
          this.amount = .03;
      }

      this.profit_factor = .1;
    }
    getQuoteperGal(){
        var margin = 1.5 * (this.location - this.history + this.amount + this.profit_factor);
        return 1.5 + margin
    }
    getTotalQuote(){
        var margin = 1.5 * (this.location - this.history + this.amount + this.profit_factor);
        return this.galAmount * (1.5 + margin)
    }
    
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