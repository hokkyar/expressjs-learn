const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// set up express app
const app = express()

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago') // ninjago is the name of DB
mongoose.Promise = global.Promise

// using bodyParser
app.use(bodyParser.json())

// initialize routes
app.use('/api', routes)

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({
    error: err.errors.name.message // depends error data json
  })
})

app.listen(process.env.port || 4000, () => {
  console.log('Running on http://localhost/4000')
})