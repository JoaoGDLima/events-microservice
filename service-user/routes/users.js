// modules
    const { response } = require("express")
    const express = require("express")
    const router = express.Router()
    const bcrypt = require("bcryptjs")
    const cookieParser = require('cookie-parser')
    require("dotenv-safe").config();
    const jwt = require('jsonwebtoken');

// models
    const Users = require("../models/User-postgres")
    
// Session
    router.use(cookieParser());

// Routes
    router.post('/auth', (req, res, next) => {

        Users.findAll({
            where: {
              email: req.body.email
            }
          }).then((user) => {
                console.log(req.body.password)  
                bcrypt.compare(req.body.password, user[0].password, (erro, success) => {
                    if(success){
                        const cpf = user[0].cpf
                        const name = user[0].name
                        const email = user[0].email
                        const type = user[0].tipo
                        const token = jwt.sign({ cpf }, process.env.SECRET, {
                            expiresIn: 300 // expires in 5min
                        });
                        
                        res.cookie('token', token)
                        res.cookie('userData', cpf);
                        res.cookie('userName', name);
                        res.cookie('userEmail', email);
                        res.cookie('userType', type);

                        res.redirect('/events')
                    }else{
                        res.status(500).json({message: 'Login inválido!'});
                    }
                })
          });
    })


    router.post('/register', (req, res) => {
        var erros = []

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
            erros.push({texto: "Nome inválido"})
        }

        if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null){
            erros.push({texto: "CPF inválida"})
        }

        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
            erros.push({texto: "Email inválida"})
        }

        if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
            erros.push({texto: "Senha inválida"})
        }

        if(req.body.password != req.body.password2){
            erros.push({texto: "As senhas são diferentes, tente novamente!"})
        }

        if(erros.length > 0){
            res.send("Erro sss")
        }else{
            //Users.findOne({email: req.body.email}).then((user) => {
            //    if(user){
            //        res.send("Já exite uma conta com este e-mail no nosso sistema!")
            //    }else {
                    var cpf = req.body.cpf
                    var cpf = cpf.replace('.', '') //remove UM ponto
                    var cpf = cpf.replace('.', '') //remove UM ponto
                    var cpf = cpf.replace(',', '') //remove UMA virgula
                    var cpf = cpf.replace('-', '') //remove UM traço
                                    
                    bcrypt.genSalt(10, (erro, salt) => {
                        if(erro){
                            console.log(erro)
                        }else{
                            bcrypt.hash(req.body.password, salt, (erro, hash) => {
                                console.log('hash: ' + hash)
                              
                                Users.create({
                                    cpf: cpf,  
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash
                                }).then(() => {
                                    res.redirect("/")
                                }).catch((erro) => {
                                    res.send("Houve um erro durante o salvamento de usuário!" + erro)  
                                })
                            })
                        }
                    })
               // }
           // })
        }
    })

// others
    module.exports = router