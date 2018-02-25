const router = require('express').Router();
const db = require('../db');
const { Customer } = db.model;
router.use(require('body-parser').urlencoded());
router.use(require('body-parser').json());


let customerArray = []

router.get('/customers', (req, res, next) => {
    Customer.findAll()
        .then((customers) => {
            customerArray = customers;
            res.send(customers)
        })
        .catch(next)
})

router.post('/customers', (req, res, next) => {
    let flag = true;
    let email = req.body.customer;
    customerArray.forEach((customer) => {
        if (customer.email === email) {
            flag = false;
        }
    })
    if (flag) {
        Customer.create({
                email: email
            }

        )
        res.redirect('/customers');


    } else {
        res.status('506').send('this a duplicate email')
            .catch(next)
    }
})

router.delete('/customers/:id', (req, res, next) => {
    Customer.findById(req.params.id)
        .then((customer) => {
            return customer.destroy();
        })
        .then(() => {
            res.redirect('/customers');
        })
        .catch(next)
})

module.exports = router;