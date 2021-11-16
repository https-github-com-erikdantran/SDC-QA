const express = require('express');
const app = express();
const port = 3001;
const router = require('./router.js');

app.use('/qa', router)

app.listen(port, console.log('listening on port 3001'))