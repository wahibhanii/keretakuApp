'use strict';
module.exports = (sequelize, DataTypes) => {
  var Train = sequelize.define('Train', {
    trainName: DataTypes.STRING
  });

  Train.associate = function (models) {
    Train.belongsToMany(models.Route, {through: 'TrainRoute'});
  };


  return Train;
};
