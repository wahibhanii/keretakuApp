const express         = require('express');
const router          = express.Router();
const models          = require('../models')
const User            = models.User
const TrainRoute      = models.TrainRoute
const Train           = models.Train
const Transaction     = models.Transaction
const Route           = models.Route
const passwordAuth    = require ('../helpers/passwordAuth')
const adminAuth       = require('../helpers/adminAuth')
const convertTime     = require('../helpers/convertTime')
const getTripTime     = require('../helpers/getTripTime')
const authHandler     = require('../helpers/adminAuth')
const sendBookingInfo = require('../helpers/email')
const allHandler      = require('../helpers/allAuth');

// ------------------- READ --------------------------
router.get('/', authHandler.adminAuthHandler, (req, res)=> {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  User.findAll()
  .then((dataUsers)=>{
    res.render('./users/users', {
      dataUsers : dataUsers,
      err       : err,
      session : req.session
    })
  })
  .catch((err) => {
    res.redirect(`/?err=${err.message}`);
  })
})

// ------------------- CREATE/ADD -------------------
router.get('/add', authHandler.adminAuthHandler,(req, res) => {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  res.render('./users/users_add', {
    err: err,
    session : req.session
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
router.get('/edit/:id', authHandler.adminAuthHandler,(req, res) => {
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
      err: err,
      session : req.session
    })
  })
  .catch((err) => {
    res.redirect(`/add/?err=${err.message}`);
  })

})

router.post('/edit/:id', authHandler.adminAuthHandler,(req, res) => {
  let userId = req.params.id
  let newUser = {
    id        : userId,
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

router.get('/delete/:id',authHandler.adminAuthHandler, (req, res) => {
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
      err      : err,
      session : req.session
    })
  })
  .catch((err) => {
    res.redirect(`/?err=${err.message}`);
  })
})

// ------------------- Sign Up -----------------------
router.get('/signup', (req, res) => {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  res.render('./users/users_signup', {
    err: err,
    session : req.session
  })
})

router.post('/signup', (req, res) => {
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
      res.redirect('/')
    })
    .catch((err) => {
      res.redirect(`/users/signup/?err=${err.message}`);
    })
  } else {
    res.redirect(`/users/signup/?err=Password mismatch, please repeat data entry!`);
  }
})


// -------------------  Login ------------------------

router.get('/login', (req, res) => {
  let err;
  if (req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  res.render('./users/users_login', {
    err: err,
    session : req.session
  })
})

router.post('/login', (req, res) => {
  let plainPassword = req.body.password
  User.findOne({where: {email: req.body.email}})
  .then((dataUser) => {
    if (passwordAuth.passwordAuth(plainPassword, dataUser.password )){
      let newSession = {
        userId  : dataUser.id,
        email   : dataUser.email,
        role    : dataUser.role
      }
      let loginMessage = 'You have logged in!'
      req.session.user = newSession
      res.render('./index',{
        loginMessage : 'You have logged in!',
        session : req.session
      })
    }
  })
  .catch((err) => {
    res.redirect(`/users/login/?err=${err.message}`);
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      res.send(err)
    } else {
      res.redirect('/')
    }
  });
})


// //------------------- USERPAGE ----------------
// router.get('/userpage', adminAuth.adminAuthHandler, (req, res) => {
//   res.send(req.session.user)

// // })


// router.get('/:id/transactions/', allHandler.allAuthHandler, (req, res) => {
//   let userId = req.params.id
//   User.findAll({
//     where: {id: userId},
//     include : [{
//       model: TrainRoute,
//       include: [{model: Route}]
//       }
//     ]
//   })
//   .then((dataTransactions) => {
//     res.render('./users/users_transactions',{
//       dataTransactions : dataTransactions[0]
//     })
//   })
// })

//-------------------- BOOK TRAIN / CREATE TRANSACTION -----------------------

// router.get('/:id/booktrain', (req, res) => {
//   // booking confirmation and checkout, choose passenger number
//   let userId = 15 // nanti ganti req session
//   let trainRouteId = req.params.id;
//   let dataUser;
//   let dataTrainRoute;
//   User.findOne({
//     where: {id: userId}
//   })
//   .then((queryUser) => {
//     dataUser = queryUser
//     return TrainRoute.findOne({
//       where: {id: trainRouteId},
//       include: [{model: Train}, {model: Route}]
//     })
//   })
//   .then((queryTrainRoute) => {
//     dataTrainRoute = queryTrainRoute;
//     // res.send(dataTrainRoute)
//     res.render('./users/users_booktrain',{
//       dataUser: dataUser,
//       dataTrainRoute: dataTrainRoute,
//       convertTime: convertTime
//     })
//   })
// })

// ======================== BOOK TRAIN =================================
router.post('/booktrain', (req, res) => {
  let err
  // booking confirmation and checkout, choose passenger number
  let userId = req.session.user.userId// nanti ganti req session
  let trainRouteId = req.body.trainRouteId;
  let reservedSeat = Number(req.body.reservedSeat)
  let departureDateTime = getTripTime(req.body.departureDate,req.body.departureTime)
  let dataUser;
  let dataTrainRoute;
  User.findOne({
    where: {id: userId}
  })
  .then((queryUser) => {
    dataUser = queryUser
    return TrainRoute.findOne({
      where: {id: trainRouteId},
      include: [{model: Train},
        {model: Route},
        {model: Transaction,
        }
      ]
    })
  })
  .then((queryTrainRoute) => {
    dataTrainRoute = queryTrainRoute;
    let reserved=0;
    let arrCountReserved = dataTrainRoute.Transactions.map(element => {
      return new Promise( (resolve, reject) => {
        if (element.departureTime.toISOString() == departureDateTime.toISOString() ){
          reserved+= element.seatReserved
        }
        resolve(reserved)
      })
    });
    Promise.all(arrCountReserved)
    .then(()=>{
      if (reservedSeat > dataTrainRoute.quota ){
        err = 'Reserved seat is more than seats avaliable!'
      }
      res.render('./users/users_booktrain',{
        dataUser: dataUser,
        dataTrainRoute: dataTrainRoute,
        convertTime: convertTime,
        seatLeft : (dataTrainRoute.quota - reserved),
        reservedSeat: reservedSeat,
        departureDateTime : departureDateTime,
        err: err,
        session : req.session
      })
    })
  })
})

// BookTrain Success
router.post('/booktrain/success', (req, res) => {
  let newTransaction = {
    TrainRouteId: req.body.trainRouteId,
    UserId: req.body.userId,
    departureTime: req.body.departureTime,
    seatReserved: req.body.seatReserved
  }
  Transaction.create(newTransaction)
  .then(()=>{
    let bookingInfo = {
      email         : req.body.email,
      TrainRouteId  : req.body.trainRouteId,
      UserId        : req.body.userId,
      departure     : req.body.departure,
      arrival       : req.body.arrival,
      departureTime : req.body.departureTime,
      seatReserved  : req.body.seatReserved,
      trainName     : req.body.trainName
    }
    sendBookingInfo(bookingInfo)
    console.log(bookingInfo)

    res.redirect(`/users/${req.session.user.userId}/transactions`)
  })
})

// ===================================================================================
// --------------------- ALL TRANSACTION --------------

router.get('/:id/transactions/', allHandler.allAuthHandler,(req, res) => {
  let userId = req.params.id
  User.findAll({
    where: {id: userId},
    include : [{
      model: TrainRoute,
      include: [{model: Route}],
      session : req.session
      }
    ]
  })
  .then((dataTransactions) => {
    // res.send(dataTransactions)
    res.render('./users/users_transactions',{
      
      dataTransactions : dataTransactions[0],
      session : req.session
    })
  })
})

router.get('/:id/transactions/:transactionId/delete/',(req,res)=>{
  Transaction.destroy({where: {id : req.params.transactionId}})
  .then(()=>{
    res.redirect(`/users/${req.params.id}/transactions/`)
  })
})



module.exports = router
