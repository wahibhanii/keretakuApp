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
  res.render('./trains/add')
})

router.post('/add', (req,res)=>{
  Train.create(
    {trainName : req.body.trainName}
  ).then(()=>{
    res.redirect('/trains')
  })
})

//---------------- EDIT TRAIN ----------------------
router.get('/edit/:id', (req,res)=>{
  Train.findById(req.params.id)
  .then((dataTrain)=>{
    res.render('./trains/edit',{
      dataTrain : dataTrain
    })
  })
})

router.post('/edit/:id', (req,res)=>{
  Train.update({
    trainName : req.body.trainName},
    {where: {id : req.params.id}})
    .then(()=>{
    res.redirect('/trains')
  })
})

//-------------------- DELETE ----------------------
router.get('/delete/:id', (req,res)=>{
  Train.destroy({where: {id : req.params.id}})
  .then(()=>{
    res.redirect('/trains')
  })
})

//------------------- SCHEDULE ---------------------
router.get('/schedule', (req,res)=>{
  let findDeparture = '';
  let findArrival = '';
  let objWhere = {}
  if(req.query && req.query.hasOwnProperty('filter')){
    findDeparture = req.query.filter.split('-')[0]
    findArrival   = req.query.filter.split('-')[1]
    objWhere.departure = findDeparture
    objWhere.arrival = findArrival
  }

  let err;
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
        // res.send(trainRoutes)
        res.render('./trains/schedule',{
          trainRoutes : trainRoutes,
          cityUnique  : cityUnique
        })
      })
      .catch(err=>{
        res.redirect(`/schedule/?err=${err.message}`)
      })
    }).catch(err=>{
    res.send(err)
  })
})

router.post('/schedule',(req,res)=>{
  res.redirect(`/trains/schedule/?filter=${req.body.departure}-${req.body.arrival}`)
})

module.exports = router;
