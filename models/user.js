'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email   : DataTypes.STRING,
    password: DataTypes.STRING,
    role    : DataTypes.STRING,
    poin    : DataTypes.INTEGER
  });

  return User;
};