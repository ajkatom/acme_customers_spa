const conn = require('./conn');
const { Sequelize } = conn;

const Customer = conn.define('customer', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    }
});


module.exports = Customer;