'use strict';
module.exports = (sequelize, DataTypes) => {
  var TrainRoute = sequelize.define('TrainRoute', {
    RouteId: DataTypes.INT,
    TraindId: DataTypes.INT,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    quota: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TrainRoute;
};