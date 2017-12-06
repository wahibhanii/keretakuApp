'use strict';
module.exports = (sequelize, DataTypes) => {
  var TrainRoute = sequelize.define('TrainRoute', {
    RouteId: DataTypes.INTEGER,
    TrainId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    quota: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  TrainRoute.associate = (models) => {
    TrainRoute.belongsToMany(models.User, {through: 'Transaction', foreignKey: 'TrainRouteId', otherKey: 'UserId'})
  }
  return TrainRoute;
};
