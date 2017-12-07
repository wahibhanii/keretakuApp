const express = require('express')
const router = express.Router()
const models = require('../models')
const Train = models.Train
const TrainRoute = models.TrainRoute
const Route = models.Route
const adminAuth = require('../helpers/adminAuth');
//---------------- ALL TRAIN ---------------------
router.get('/', adminAuth.adminAuthHandler,(req,res)=>{
  Train.findAll()
  .then((dataTrains)=>{
    res.render('./trains/train', {
      dataTrains : dataTrains
    })
  })
})

//----------------- ADD TRAIN ---------------------
router.get('/add', adminAuth.adminAuthHandler,(req,res)=>{
  let err;
  console.log(req.session);
  if(req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  res.render('./trains/add',{
    err:err
  })
})

router.post('/add', adminAuth.adminAuthHandler, (req,res)=>{
    if(req.body.trainName !== ''){
    Train.create(
      {trainName : req.body.trainName}
    ).then(()=>{
      res.redirect('/trains')
    })
  } else {
    res.redirect(`/trains/add/?err=Train name can not be empty!`)
  }
})


//---------------- EDIT TRAIN ----------------------
router.get('/edit/:id', adminAuth.adminAuthHandler,(req,res)=>{
  let err;
  if(req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  Train.findById(req.params.id)
  .then((dataTrain)=>{
    res.render('./trains/edit',{
      dataTrain : dataTrain,
      err       : err
    })
  })
})

router.post('/edit/:id', adminAuth.adminAuthHandler,(req,res)=>{
  if(req.body.trainName !== ''){
    Train.update({
      trainName : req.body.trainName},
      {where: {id : req.params.id}})
      .then(()=>{
      res.redirect('/trains')
    })
  } else {
    res.redirect(`/trains/edit/${req.params.id}/?err=Train name cannot be empty!`)
  }
})

//-------------------- DELETE ----------------------
router.get('/delete/:id',adminAuth.adminAuthHandler,(req,res)=>{
  Train.destroy({where: {id : req.params.id}})
  .then(()=>{
    res.redirect('/trains')
  })
})

//------------------- SCHEDULE ---------------------
router.get('/schedule',adminAuth.adminAuthHandler,(req,res)=>{
  console.log('*************',req.session.user.role);
  let findDeparture = '';
  let findArrival = '';
  let objWhere = {}
  let err = false;
  if(req.query && req.query.hasOwnProperty('filter')){
    findDeparture = req.query.filter.split('-')[0]
    findArrival   = req.query.filter.split('-')[1]
      if(findDeparture !== findArrival){
      objWhere.departure = findDeparture
      objWhere.arrival = findArrival
      }
  }

  Route.findAll()
  .then((cityRoute)=>{
    // console.log('==============',cityRoute.length);
      //----------------------- SEARCH UNIQUE -----------------------------//
    let cityArr = [];
    cityRoute.forEach((cityRoute)=>{
      cityArr.push(cityRoute.departure)
      cityArr.push(cityRoute.arrival)
    })

    var cityUnique = cityArr.filter((value, index, self)=> {
      return self.indexOf(value) === index;
    });
    //----------------------- SEARCH UNIQUE -----------------------------//

    Route.findAll({
      where: objWhere
    })
    .then(dataRoutes=>{
                //-- BUAT CARI RUTE SESUAI FILTER --
      let searchRouteId = {}
      if(req.query && req.query.hasOwnProperty('filter')){
          if(dataRoutes.length == cityRoute.length){ //RouteId not found
            err = 'Routes are not available yet'
          } else {
          searchRouteId.RouteId = dataRoutes[0].id
          }
        }
      TrainRoute.findAll({ //cari train route
        where : searchRouteId,
        include: [
          {model: Route},
          {model: Train}
        ]}
      ).then((trainRoutes)=>{
        // console.log(trainRoutes);
        if (trainRoutes.length == 0) { //RouteId belum diassign ke TrainRoutes
          err = 'Routes are not found'
        }
          res.render('./trains/schedule',{
            trainRoutes : trainRoutes,
            cityUnique  : cityUnique,
            err         : err
          })
        })
        .catch(err=>{
          res.redirect(`/schedule/?err=${err.message}`)
        })
      }).catch(err=>{
      res.send('not found')
    })
  })
})

router.post('/schedule',(req,res)=>{
  res.redirect(`/trains/schedule/?filter=${req.body.departure}-${req.body.arrival}`)
})

module.exports = router;
