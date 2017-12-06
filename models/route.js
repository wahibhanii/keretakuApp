'use strict';
module.exports = (sequelize, DataTypes) => {
  var Route = sequelize.define('Route', {
    departure: {
      type: DataTypes.STRING,
      validate: {notEmpty:true}
    },
    arrival: {
      type: DataTypes.STRING,
      validate: {notEmpty:true}
    }
  });

  Route.associate = function (models) {
    Route.belongsToMany(models.Train, {through: 'TrainRoute'});
};

  return Route;
};
