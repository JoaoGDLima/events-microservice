const mongoose = require("mongoose")

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/events").then(() => {
    console.log("Mongodb conectado")
}).catch((err) => {
    console.log("Mongodb erro na conexão: " + err)
})

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    cpf: {
        type: Number,
        require: true
    },
    email: {
        Type: String,
        require: false
    },
    password: {
        Type: String,
        require: false
    }
})

mongoose.model('user', UserSchema)


const adminUser = mongoose.model('user')

new adminUser({
    name: "admin",
    cpf: 12345678909,
    email: "Admin@Admin.com",
    password: "admin"
}).save().then(() => {
    console.log("Usuário cadastrado com sucesso")
}).catch((err) => {
    console.log("Erro ao cadastrar usuário: " + err)
})