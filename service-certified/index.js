// modules
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const certified = require('./routes/certified')

// config
    // body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

// Routes
app.use('/', certified)

// otherss
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})