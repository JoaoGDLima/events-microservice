// modules
    const express = require("express")
    const router = express.Router()
    const httpProxy = require('express-http-proxy');
    const getJSON = require('get-json')

// microservices
    const eventsServiceProxy = httpProxy('http://localhost:3002');

// routes
    router.get('/', (req, res, next) => {
        const cpf = req.cookies.userData
        res.render("app/subscriptions", {event: req.query.event, cpf: cpf})
    })

    router.get('/checkin', (req, res, next) => {
        res.render("app/checkin", {event: req.query.event})
    })

    router.get('/mysubs', async(req, res, next) => {
        const cpf = req.cookies.userData
        getJSON('http://localhost:3002/subscriptions/list/'+cpf, function(error, response){
            console.log('chegou aqui!')
            res.render("app/mysubs", {subs: response})
        }) 
    })

    router.post('/subscriptions/checkin', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })

    router.post('/subscriptions/delete', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })

    router.post('/subscriptions/add', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })

    router.get('/subscriptions/list/:id', (req, res, next) => {
        eventsServiceProxy(req, res, next)
    })



module.exports = router