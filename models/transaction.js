'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    TrainRouteId: DataTypes.STRING,
    UserId: DataTypes.STRING,
    departureDate: DataTypes.DATE,
    seatReserved: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transaction;
};