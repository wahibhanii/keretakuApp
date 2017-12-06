'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    TrainRouteId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
    seatReserved: DataTypes.INTEGER
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User)
  }

  return Transaction;
};