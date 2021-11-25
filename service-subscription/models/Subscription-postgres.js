const Sequelize = require('sequelize');
const database = require('./db');
const Event = require('./Event-postgres')

const Subscription = database.define('subscription', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    presence: { type: Sequelize.STRING, allowNull: false},
    situation: { type: Sequelize.STRING, allowNull: false},
    idEvent: { type: Sequelize.INTEGER, allowNull: false},
    certified: { type: Sequelize.STRING, allowNull: true},
    user: { type: Sequelize.STRING, allowNull: false, references: { model: 'users', key: 'cpf'}},
})

Subscription.belongsTo(Event, { foreignKey: 'idEvent', allowNull: false})

//Subscription.sync({ force: true });
module.exports = Subscription;