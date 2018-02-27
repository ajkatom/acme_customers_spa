const express = require('express');
const app = express();
const db = require('../db');
const path = require('path');
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/api', require('../api'))




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