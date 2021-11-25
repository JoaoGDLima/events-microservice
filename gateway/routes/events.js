// modules
    const express = require("express")
    const router = express.Router()
    const httpProxy = require('express-http-proxy');
    const getJSON = require('get-json')

// microservices
    const eventsServiceProxy = httpProxy('http://localhost:3002');

// routes
    router.get('/add', (req, res, next) => {
        res.render("app/addevents")
    })
    
    router.get('/', async(req, res, next) => {
        var type = req.cookies.userType
        if(type=='A'){
            type = true
        }else{
            type = false
        }

        console.log(type)

        getJSON('http://localhost:3002/events/list', function(error, response){
          res.render("app/events", {events: response, userType: type})
        }) 
    })

    router.post('/events/delete', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })

    router.get('/events/list', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })

    router.post('/events/add', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })

module.exports = router