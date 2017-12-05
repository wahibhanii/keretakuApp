const express = require('express');
const router = express.Router();
const models = require('../models')
const User = models.User

router.get('/', (req, res)=> {
    User.findAll()
    .then((dataUsers)=>{
      res.render('./users/users', {
        dataUsers : dataUsers
      })
    })
})


module.exports = router