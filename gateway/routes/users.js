// modules
    const express = require("express")
    const router = express.Router()
    const httpProxy = require('express-http-proxy');

// microservices
    const UserServiceProxy = httpProxy('http://localhost:3001');

// routes
    router.post('/register', (req, res, next) => {
        UserServiceProxy(req, res, next)
    })

    router.post('/auth', async (req, res, next) => {
        UserServiceProxy(req, res, next)
    })

    router.get('/register', (req, res) => {
        res.render('users/register');
    })

    router.get('/login', (req, res) => {
        res.render('users/login');
    })
 
module.exports = router