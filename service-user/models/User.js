const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/testeuser", { useNewUrlParser: true }).then(() => {
    console.log("Mongodb conectado")
}).catch((err) => {
    console.log("Mongodb erro na conexão: " + err)
})

const Users = new Schema({
    name: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    email: {
        Type: String,
        required: false
    },
    password: {
        Type: String,
        required: false
    }
})

mongoose.model('user', Users)