'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email   : {
      type     : DataTypes.STRING,
      validate : {
        notEmpty : true,
        isEmail : true,
        isUnique: function (value, next){
          const Op = sequelize.Op
          User.findAll({
            where: {
              email: value,
              id   : {[Op.ne]: this.id}
            }
          })
          .then((dataUsers)=>{
            if (dataUsers.length > 0){
              return next('E-mail already in use')
            } else {
              next()
            }
          })
          .catch((err) => {
            return next(err)
          })
        }
      }
    },
    password: DataTypes.STRING,
    role    : DataTypes.STRING,
    poin    : DataTypes.INTEGER
  });

  User.afterValidate((user, options) => {
    return bcrypt.hash(user.password, saltRounds)
    .then((hashPassword) => {
      user.password = hashPassword
    });
  });
  
  User.associate = (models) => {
    User.belongsToMany(models.TrainRoute, {through: 'Transaction', foreignKey: 'UserId', otherKey: 'TrainRouteId'})
    User.hasMany(models.Transaction)
  }

  return User;
};