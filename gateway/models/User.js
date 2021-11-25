const db = require('./db')

const User = db.sequelize.define('users', {
    name: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.INTEGER
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
});

User.sync({force: true})