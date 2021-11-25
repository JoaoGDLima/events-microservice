// modules
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const events = require('./routes/events')
const subscriptions = require('./routes/subscriptions')

// config
// body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routes
app.use('/events', events)
app.use('/subscriptions', subscriptions)

// others
app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002")
})