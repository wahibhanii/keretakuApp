'use strict';
module.exports = (sequelize, DataTypes) => {
  var Train = sequelize.define('Train', {
    trainName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Train;
};