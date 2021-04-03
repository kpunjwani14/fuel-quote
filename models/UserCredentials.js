'use strict';
const {
  Model
} = require('sequelize');

module.exports =
    (sequelize, DataTypes) => {
        class UserCredentials extends Model { 
            
        }

        UserCredentials.init({
            // Model attributes are defined here
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true

            },
            Username: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            Password: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            
        }, {

            sequelize, // We need to pass the connection instance
            modelName: 'UserCredentials',// We need to choose the model name
            tableName: 'User_Credentials'
        });
        UserCredentials.associate = (model) =>{
            UserCredentials.hasOne(model.ClientInformation,{
            foreignKey:'UserId',
            allowNull:false
          })}
        return UserCredentials
    }

