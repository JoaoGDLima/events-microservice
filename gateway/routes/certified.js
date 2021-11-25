// modules
const express = require("express")
const router = express.Router()
const httpProxy = require('express-http-proxy');
const getJSON = require('get-json')

// microservices
const certifiedServiceProxy = httpProxy('http://localhost:3003');

// routes
router.post('/add', (req, res, next) => {
    certifiedServiceProxy(req, res, next)
})

router.get('/list/:id', async(req, res, next) => {
    var id = req.params.id

    getJSON('http://localhost:3003/validate/' + id, function(error, response){
        if(error){
          res.redirect('/cert')
        } else {
          if(response){
            res.render("app/certified", {cert: response})
          }else{
            res.redirect('/cert')
          }
  
        }
      
      }).catch((err) => {
        redirect('/cert')
      })
})


module.exports = router