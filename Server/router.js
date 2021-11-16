const router = require('express').Router();
const controller = require('./controller.js');

router.get('/questions', controller.getQuestions)
  .post('/questions')

module.exports = router;