const express = require('express')
const router = express.Router()
const models = require('../models')
const Train = models.Train
const TrainRoute = models.TrainRoute
const Route = models.Route
//---------------- ALL TRAIN ---------------------
router.get('/', (req,res)=>{
  Train.findAll()
  .then((dataTrains)=>{
    res.render('./trains/train', {
      dataTrains : dataTrains
    })
  })
})

//----------------- ADD TRAIN ---------------------
router.get('/add', (req,res)=>{
  let err;
  if(req.query && req.query.hasOwnProperty('err')){
    err = req.query.err
  }
  res.render('./trains/add',{
    err:err
  })
})

router.post('/add', (req,res)=>{
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
router.get('/edit/:id', (req,res)=>{
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

router.post('/edit/:id', (req,res)=>{
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
router.get('/delete/:id',(req,res)=>{
  Train.destroy({where: {id : req.params.id}})
  .then(()=>{
    res.redirect('/trains')
  })
})

//------------------- SCHEDULE ---------------------
router.get('/schedule',(req,res)=>{
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

  Route.findAll({
    where: objWhere
  })
  .then(dataRoutes=>{

    //----------------------- SEARCH UNIQUE -----------------------------//
    let cityArr = [];
    dataRoutes.forEach((dataRoute)=>{
      cityArr.push(dataRoute.departure)
    })

    var cityUnique = cityArr.filter((value, index, self)=> {
      return self.indexOf(value) === index;
    });
    //-------------------------------------------------------------------//
              //-- BUAT CARI RUTE SESUAI FILTER --
    let searchRouteId = {}
    if(req.query && req.query.hasOwnProperty('filter')){
      searchRouteId.RouteId = dataRoutes[0].id
      }
    TrainRoute.findAll({ //cari train route
      where : searchRouteId,
      include: [
        {model: Route},
        {model: Train}
      ]}
    )
      .then((trainRoutes)=>{
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

router.post('/schedule',(req,res)=>{
  res.redirect(`/trains/schedule/?filter=${req.body.departure}-${req.body.arrival}`)
})

module.exports = router;
