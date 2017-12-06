const bcrypt = require('bcrypt');
const saltRounds = 10;

let passwordAuth = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
  passwordAuth : passwordAuth
}