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
        .catch(next)
})

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    res.send({ "status": res.status, "error": err });
});

module.exports = router