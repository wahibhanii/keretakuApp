'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    id:{
      type : DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TrainRouteId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
    seatReserved: DataTypes.INTEGER
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.TrainRoute)
  }

  return Transaction;
};