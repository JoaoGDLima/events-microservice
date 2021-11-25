const express = require("express")
const router = express.Router()
const Certified = require("../models/certified")

router.post('/add', (req, res) => {
    console.log('user' + req.body.user);

    var cert = Certified.findAll({
        where: {subscription: req.body.subscription}
    })

    if(cert){
        res.send('Certificado já gerado!')
    }else{
        Certified.create({
            subscription: req.body.subscription,
            title: req.body.eventname,
            description: "Certificamos que " + req.body.user + " participou do evento '" + req.body.eventname+ "'.",
        }).then((cert) => {
            console.log("Certificado gerado com sucesso!")
            res.send('Certificado gerado com sucesso!')
        }).catch((err) => {
            console.log("Erro ao realizar a geraão de certificado: " + err) 
        })
    }
    
})

router.get('/validate/:id', (req, res) => {
    var id = req.params.id
    Certified.findByPk(id).then((cert) => {
        res.json(cert)
    }).catch((err) => {
        res.status(400)
    })
})

module.exports = router