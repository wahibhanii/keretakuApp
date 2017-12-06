'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email   : {
      type     : DataTypes.STRING,
      validate : {
        notNull: (value, next) => {
          if (value === null) {
            return next('E-mail field cannot be empty!')
          } else {
            next()
          }
        },
        isEmail : true,
        isUnique: (value, next) => {
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

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, saltRounds)
    .then((hashPassword) => {

      console.log('ini hash -------->> ',hashPassword)
      user.password = hashPassword
    });
  });

  return User;
};