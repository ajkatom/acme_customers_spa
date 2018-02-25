const express = require('express');
const app = express();
const db = require('../db');
const path = require('path');
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', require('../api'))

// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });


// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     console.error(err);
//     res.send({ "status": res.status, "error": err });
// });


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server started on ${port}`);
});


db.sync()
    .then(() => {
        db.seed()
    })
    .catch(console.error);


module.exports = app;