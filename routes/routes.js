const express = require('express')
const router = express.Router()
const models = require('../models')
const Route = models.Route

//show all route
router.get('/', (req,res)=>{
  Route.findAll()
  .then((dataRoutes)=>{
    res.render('./routes/route', {
      dataRoutes : dataRoutes
    })
  })
})

//add route
router.get('/add', (req,res)=>{
  let err = req.query.err;
  res.render('./routes/add',{
    err : err
  })
})

router.post('/add', (req,res)=>{
  Route.create(
    {departure : req.body.departure,
     arrival   : req.body.arrival
    }
  ).then(()=>{
    res.redirect('/routes')
  }).catch((err)=>{
    res.redirect(`/routes/add/?err=${err.message}`)
    // res.render('./routes/add',{
    //   err : err.message
    // })
  })
})

//edit route
router.get('/edit/:id', (req,res)=>{
  Route.findById(req.params.id)
  .then((dataRoute)=>{
    res.render('./routes/edit',{
      dataRoute : dataRoute
    })
  })
})

router.post('/edit/:id', (req,res)=>{
  Route.update({
    departure : req.body.departure,
    arrival   : req.body.arrival
  },
    {where: {id : req.params.id}})
    .then(()=>{
    res.redirect('/routes')
  })
})

//delete
router.get('/delete/:id', (req,res)=>{
  Route.destroy({where: {id : req.params.id}})
  .then(()=>{
    res.redirect('/routes')
  })
})



module.exports = router;
