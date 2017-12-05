'use strict';
module.exports = (sequelize, DataTypes) => {
  var Route = sequelize.define('Route', {
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Route;
};