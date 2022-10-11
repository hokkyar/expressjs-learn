const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

// get list of ninjas
router.get('/ninjas', (req, res, next) => {
  // get all ninjas
  Ninja.find().then((ninjas) => {
    res.send(ninjas)
  })

  // get the nearest ninjas (with geolocation)
  // Ninja.geoNear(
  //   { type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)] },
  //   { maxDistance: 100000, spherical: true }
  // ).then((ninjas) => {
  //   res.send(ninjas)
  // }).catch(next)
})

// add new ninjas to DB
router.post('/ninjas', (req, res, next) => {
  // OLD 
  // var ninja = new Ninja(req.body)
  // ninja.save()

  // NEW
  Ninja.create(req.body).then((ninja) => {
    res.send(ninja)
  }).catch(next)
})

// edit ninja
router.put('/ninjas/:id', (req, res, next) => {
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Ninja.findOne({ _id: req.params.id }).then((ninja) => {
      res.send(ninja)
    })
  })
})

// delete ninja
router.delete('/ninjas/:id', (req, res, next) => {
  Ninja.findByIdAndRemove({ _id: req.params.id }).then((ninja) => {
    res.send(ninja)
  })
})

module.exports = router