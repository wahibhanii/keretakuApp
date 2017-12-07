const express = require('express')
const router = express.Router()
const models = require('../models')
const Route = models.Route
const authHandler = require('../helpers/adminAuth');
const TrainRoute = models.TrainRoute;

//show all route
router.get('/',(req,res)=>{

    Route.findAll()
    .then((dataRoutes)=>{
      // res.send(dataRoutes)
      res.render('./routes/route', {
        dataRoutes : dataRoutes
      })
    })
})

//add route
router.get('/add', authHandler.adminAuthHandler,(req,res)=>{
  let err = req.query.err;
  res.render('./routes/add',{
    err : err
  })
})

router.post('/add', authHandler.adminAuthHandler, (req,res)=>{
  Route.create(
    {departure : req.body.departure,
     arrival   : req.body.arrival
    }
  ).then(()=>{
    res.redirect('/routes')
  }).catch((err)=>{
    res.redirect(`/routes/add/?err=${err.message}`)
  })
})

//edit route
router.get('/edit/:id',  authHandler.adminAuthHandler, (req,res)=>{
  let err;
    if(req.query && req.query.hasOwnProperty('err')){
      err = req.query.err
    }
    Route.findById(req.params.id)
    .then((dataRoute)=>{
      res.render('./routes/edit',{
        dataRoute : dataRoute,
        err       : err
      })
    })

})

router.post('/edit/:id',  authHandler.adminAuthHandler,(req,res)=>{
  if(req.body.departure !== '' || req.body.arrival !== ''){
    Route.update({
      departure : req.body.departure,
      arrival   : req.body.arrival
    },
      {where: {id : req.params.id}})
      .then(()=>{
      res.redirect('/routes')
    })
  } else {
    res.redirect(`/routes/edit/${req.params.id}/?err=Departure and arrival must be filled`)
  }
})

//delete
router.get('/delete/:id',  authHandler.adminAuthHandler,(req,res)=>{
  Route.destroy({where: {id : req.params.id}})
  .then(()=>{
    res.redirect('/routes')
  })
})



module.exports = router;
