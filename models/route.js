'use strict';
module.exports = (sequelize, DataTypes) => {
  var Route = sequelize.define('Route', {
    departure: {
      type: DataTypes.STRING,
      validate: {isNull:true}
    },
    arrival: {
      type: DataTypes.STRING,
      validate: {isNull:true}
    }
  });
  return Route;
};
