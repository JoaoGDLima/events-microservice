// modules
    const express = require('express')
    const bodyParser = require('body-parser')
    
    const app = express()
    const users = require('./routes/users')

// config
// body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

// Routes
    app.use('/', users)

// otherss
    app.listen(3001, () => {
        console.log("Servidor rodando na porta 3001")
    })