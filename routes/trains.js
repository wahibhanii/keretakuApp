const express = require('express')
const router = express.Router()
const models = require('../models')
const Train = models.Train

//show all train
router.get('/', (req,res)=>{
  Train.findAll()
  .then((dataTrains)=>{
    res.render('./trains/train', {
      dataTrains : dataTrains
    })
  })
})

//add train
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

//edit train
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

//delete
router.get('/delete/:id', (req,res)=>{
  Train.destroy({where: {id : req.params.id}})
  .then(()=>{
    res.redirect('/trains')
  })


  // public static destroy(options: Object): Promise<Integer>
})



module.exports = router;
