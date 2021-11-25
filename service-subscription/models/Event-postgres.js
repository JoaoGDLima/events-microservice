const Sequelize = require('sequelize');
const database = require('./db');

const Event = database.define('event', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    places: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

/*Event.associate = function(models) {
    Event.hasMany(models.subscription, 
        {as: 'subscription'})
  };*/

//Event.sync({ force: true });
module.exports = Event;