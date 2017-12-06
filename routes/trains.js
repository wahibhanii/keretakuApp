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

//---------------- SCHEDULE ---------------------
router.get('/schedule', (req,res)=>{
  Route.findAll()
  .then(dataRoutes=>{
    TrainRoute.findAll({
      include: [
        {model: Route},
        {model: Train}
      ]
    })
    .then((trainRoutes)=>{
      res.render('./trains/schedule',{
        trainRoutes : trainRoutes,
        dataRoutes  : dataRoutes
      })
    }).catch(err=>{
      res.send(err)
    })
  })
})


module.exports = router;
