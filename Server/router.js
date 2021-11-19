const router = require('express').Router();
const controller = require('./controller.js');

router
  .get('/questions', controller.getQuestions)
  .post('/questions', controller.addQuestion)
  .put('/questions/:question_id/helpful', controller.helpfulQuestion)
  .put('/questions/:question_id/report', controller.reportQuestion)

  .get('/questions/:question_id/answers', controller.getAnswers)
  .post('/questions/:question_id/answers', controller.addAnswer)
  .put('/answers/:answer_id/helpful', controller.helpfulAnswer)
  .put('/answers/:answer_id/report', controller.reportAnswer)

module.exports = router;