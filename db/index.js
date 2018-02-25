const express = require('express');
const app = express();
const conn = require('./conn')
const Customer = require('./customer');
const Sequelize = require('sequelize');




const sync = () => {
    return conn.sync({ force: true })

};

const seed = () => {
    const data = [Customer.create({ email: 'aj@gmail.com' }), Customer.create({ email: 'ray@gmail.com' }), Customer.create({ email: 'ben@yahoo.com' })]
    return Promise.all(data)

};


module.exports = {
    seed,
    sync,
    model: {
        Customer
    }
}