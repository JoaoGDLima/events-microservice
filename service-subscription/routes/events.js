const { response } = require("express")
const express = require("express")
const router = express.Router()
const Events = require("../models/Event-postgres")

router.get('/', (req, res) => {
    res.send("Página de eventosssss")
})

router.get('/list', (req, res) => {
    Events.findAll().then((events) => {
            res.json(events)
        })
})

router.post('/delete', (req, res) => {
    Events.destroy({
        where: { id: req.body.id }
      }).then(() => {
        res.redirect("/events/")
    })
})

router.post('/add', (req, res) => {
    var erros = []

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
        erros.push({texto: "Descrição inválida"})
    }

    if(erros.length > 0){
        res.send("Erro")
    }else{
        Events.create({
            name: req.body.name,
            description: req.body.description,
            places: req.body.places,
            date: req.body.date
        }).then(() => {
            console.log("Categoria salva com sucesso!")
            res.redirect("/events/")
        }).catch((err) => {
            console.log("Erro ao salvar categoria: " + err) 
        })

    }
})

module.exports = router