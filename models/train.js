'use strict';
module.exports = (sequelize, DataTypes) => {
  var Train = sequelize.define('Train', {
    trainName: DataTypes.STRING
  }

);
  return Train;
};
