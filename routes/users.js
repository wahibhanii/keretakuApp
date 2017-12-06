const express = require('express');
const router = express.Router();
const models = require('../models')
const User = models.User

// --------------- READ --------------------------
router.get('/', (req, res)=> {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  User.findAll()
  .then((dataUsers)=>{
    res.render('./users/users', {
      dataUsers : dataUsers,
      err       : err
    })
  })
  .catch((err) => {
    res.redirect(`/?err=${err.message}`);
  })
})

// ------------------- CREATE/ADD -------------------
router.get('/add', (req, res) => {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  res.render('./users/users_add', {
    err: err
  })
})

router.post('/add', (req, res) => {
  let newUser = {
    email     : req.body.email,
    password1 : req.body.password1,
    password2 : req.body.password2,
    role      : req.body.role,
    poin      : req.body.poin
  }
  if (newUser.password1 === newUser.password2){
    newUser.password = newUser.password1;
    if(newUser.poin == ''){
      newUser.poin = null;
    }
    User.create(newUser)
    .then(() => {
      res.redirect('/users')
    })
    .catch((err) => {
      res.redirect(`/add/?err=${err.message}`);
    })
  } else {
    res.redirect(`/users/add/?err=Password mismatch, please repeat data entry!`);
  }
})


// ------------------- UPDATE/EDIT ---------------------
router.get('/edit/:id', (req, res) => {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  User.findOne({
    where : {id: req.params.id}
  })
  .then((dataUser) => {
    res.render('./users/users_edit', {
      dataUser : dataUser,
      err: err
    })
  })
  .catch((err) => {
    res.redirect(`/add/?err=${err.message}`);
  })

})

router.post('/edit/:id', (req, res) => {
  let userId = req.params.id
  let newUser = {
    email     : req.body.email,
    password1 : req.body.password1,
    password2 : req.body.password2,
    role      : req.body.role,
    poin      : req.body.poin,
    updatedAt : new Date()
  }
  if (newUser.password1 === newUser.password2){
    if (newUser.password1 !== ''){
      newUser.password = newUser.password1
    }
    if(newUser.poin == ''){
      newUser.poin = null;
    }

    console.log('ini edit new user',newUser)
    User.update(newUser, {where: {id: userId} })
    .then(() => {
      res.redirect('/users')
    })
    .catch((err) => {
      res.redirect(`/edit/${userId}/?err=${err.message}`);
    })
  } else {
    res.redirect(`/users/edit/${userId}/?err=Password mismatch, please repeat data entry!`);
  }
})


// ------------------- DESTROY/DELETE -------------------

router.get('/delete/:id', (req, res) => {
  let userId = req.params.id;
  let dataUser;
  let err;
  if (req.query && req.query.hasOwnProperty('err') ){
    err = req.query.err
  }
  User.findOne({where: {id: userId}})
  .then((queryUser)=> {
    dataUser = queryUser
    console.log('ini teeeeeeeeeeest')
    return User.destroy({where: {id: userId}})
  })
  .then(() => {
    res.render('./users/users_delete',{
      dataUser : dataUser,
      err      : err
    })
  })
  .catch((err) => {
    res.redirect(`/?err=${err.message}`);
  })

})



module.exports = router
