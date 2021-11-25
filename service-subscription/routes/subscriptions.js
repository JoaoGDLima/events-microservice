const express = require("express")
const router = express.Router()
const Subscriptions = require("../models/Subscription-postgres")
const Events = require("../models/Event-postgres")
const getJSON = require('get-json')

router.get('/', (req, res) => {
    res.send("Página de inscricoes")
})

router.get('/list/:id', (req, res) => {

    Subscriptions.findAll({
            where: {user: req.params.id},
            include: [{
                model: Events,
                required: true,
                attributes: ['id', 'name', 'description', 'date']
            }]
        }).then((subs) => {
            res.json(subs)
        })
})

router.post('/delete', (req, res) => {
    Subscriptions.destroy({
        where: { id: req.body.id }
      }).then(() => {
        res.redirect("/subscriptions/mysubs")
    })
})

router.get('/list', (req, res) => {
    Events.findAll().then((events) => {
            res.json(events)
        })
})

router.post('/checkin', (req, res) => {
    const idEvent = req.body.event
    const user = req.body.user

    console.log('event: ' + idEvent + ' user: ' + user);

    Subscriptions.update(
        {presence: 'T'},
        {where: {idEvent: idEvent, user: user}}).then((rowsUpdate, [updatedBook]) => {
            res.send('Registrado')           
        }).catch((err) => {
            res.send('CPF não está na lista de participantes: ' + err)
        })
})


router.post('/add', (req, res) => {
    Subscriptions.create({
        idEvent: req.body.event,
        user: req.body.user,
        situation: "A",
        presence: ""
    }).then(() => {
        console.log("Inscrição realizada com sucesso!")
        
        enviaemail("joaoguilhermedlima@gmail.com", "Testeeeee")
        
        res.redirect("/subscriptions/mysubs")
    }).catch((err) => {
        console.log("Erro ao realizar inscrição categoria: " + err) 
    })
})

async function enviaemail(from, subject){
    console.log("envio de email para" + from)
    getJSON('http://localhost:3004/send/'+from+'/'+subject, function(error, response){
        console.log('chegou aqui!')
    }) 
}

module.exports = router