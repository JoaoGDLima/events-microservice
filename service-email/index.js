// modules
const express = require('express')
const nodemailer = require('nodemailer')
const { use } = require('../service-certified/routes/certified')
const app = express()

const user = "arqsoftm@gmail.com"
const pass = "arqsoft@123"

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.post('/', (req, res) => {
    res.send('Chegous')
})

app.get('/send/:email/:subject', (req, res) => {
    const email = 'joaoguilhermedlima@gmail.com'
    const subject = 'Email teste'
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {user, pass}

    })

    transporter.sendMail({
        from: user,
        to: email,
        subject: subject,
        text: 'Teste de envio de email'
    }).then((info) => {
        res.send(info)
    }).catch((err) => {
        res.send(err)
    })
})

// otherss
app.listen(3004, () => {
    console.log("Servidor rodando na porta 3004")
})