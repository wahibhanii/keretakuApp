'use strict';
module.exports = (sequelize, DataTypes) => {
  var TrainRoute = sequelize.define('TrainRoute', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    RouteId: DataTypes.INTEGER,
    TrainId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    quota: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  });

  
  TrainRoute.associate = function (models) {
    TrainRoute.belongsToMany(models.User, {through: 'Transaction', foreignKey: 'TrainRouteId', otherKey: 'UserId'})
    TrainRoute.hasMany(models.Transaction)
    TrainRoute.belongsTo(models.Route);
    TrainRoute.belongsTo(models.Train)
  };


  return TrainRoute;
};
