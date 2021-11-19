const express = require('express');
const app = express();
const morgan =require('morgan');
const router = require('./Server/router.js');

app.use(morgan('dev'));
app.use(express.json());
app.use('/qa', router);

module.exports = app;
