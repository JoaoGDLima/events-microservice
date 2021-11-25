// modules
  const express = require('express');
  const app = express();
  const logger = require('morgan');
  const httpProxy = require('express-http-proxy');
  const path = require("path")
  const { engine } = require('express-handlebars');
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const getJSON = require('get-json')

// microservices
  const certifiedServiceProxy = httpProxy('http://localhost:3003');
 
// config 
  app.use(bodyParser.urlencoded({ extended: false}))

  // routes
  const users = require('./routes/users')
  const events = require('./routes/events')
  const subscriptions = require('./routes/subscriptions')
  const certified = require('./routes/certified')

  require("dotenv-safe").config();
  const jwt = require('jsonwebtoken');

  // Session
  app.use(cookieParser());
  // app.use(flash())
  

  // Middleware
  //app.use((req, res, next) => {
    //res.locals.success_msg = req.flash("success_msg")
    //res.locals.error_msg = req.flash("error_msg")
 //   next()
  //})

  function verifyJWT(req, res, next){
      const token = req.cookies.token
      
      if(!token || typeof token == undefined || token == null){
        res.redirect('/users/login')
      }else{
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
          if (err){ 
            res.redirect('/users/login')
          } else{
            next();
          }
        });
      }
        
  }

  // Handlebars
  app.engine('handlebars', engine({defaultLayout: "main"}));
  app.set('view engine', 'handlebars');
  
  // log
  app.use(logger('dev'));

  // public
  app.use(express.static(path.join(__dirname, "public"))) 

// Routes
  app.get('/', verifyJWT, (req, res) => {
    res.redirect('/users/login')
  });

  app.use('/users', users)
  app.use('/events', verifyJWT, events)
  app.use('/subscriptions', verifyJWT, subscriptions)
  app.use('/certifieds', verifyJWT, certified)

  app.get('/logout', (req, res, next) => {
    res.clearCookie('token');
    res.clearCookie('userData');
    res.redirect('/users/login')
  })

  app.get('/teste', (req, res, next) => { 
    res.send(req.cookies);
  })

  app.get('/cert/validate', async(req, res, next) => {
    var id = req.query.id

    await getJSON('http://localhost:3003/validate/' + id, function(error, response){
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

  app.get('/cert', (req, res, next) => {
    res.render('app/validatecertified')
  })

// others
  app.listen(3000);