const Sequelize = require('sequelize');
const database = require('./db');

const User = database.define('user', {
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    },
})


//User.sync({ force: true });
module.exports = User;