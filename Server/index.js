const express = require('express');
const app = express();
const morgan =require('morgan');
const port = 3001;
const router = require('./router.js');
const relic = require('newrelic')

app.use(morgan('dev'));
app.use(express.json());
app.use('/qa', router);

app.listen(port, console.log('listening on port 3001'));