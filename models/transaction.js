'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    TrainRouteId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
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