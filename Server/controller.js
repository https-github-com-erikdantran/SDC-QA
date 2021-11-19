const helper = require('../Database/helper.js');

const controller = {
  getQuestions: (req, res) => {
    helper.getFullQuestionResponse(req.query.product_id, req.query.page, req.query.count)
      .then(results => {
        res.status(200).send(results)
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  addQuestion: (req, res) => {
    helper.addQuestion(req.body)
      .then(results => {
        res.status(201).send('Successfully posted question');
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  helpfulQuestion: (req, res) => {
    helper.helpfulQuestion(req.params.question_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  reportQuestion: (req, res) => {
    helper.reportQuestion(req.params.question_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  getAnswers: (req, res) => {
    helper.getFullAnswerResponse(req.params.question_id)
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  addAnswer: (req, res) => {
    helper.addAnswer(req.params.question_id, req.body)
      .then(results => {
        if (req.body.photos) {
          let bundle = [];
          req.body.photos.forEach(photo => bundle.push(helper.addPhotos(photo)))
          Promise.all(bundle)
            .then(results => {
              res.status(201).send('Successfully posted answer');
            })
        }
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  helpfulAnswer: (req, res) => {
    helper.helpfulAnswer(req.params.answer_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(404).send(err)
      })
  },

  reportAnswer: (req, res) => {
    helper.reportAnswer(req.params.answer_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        res.status(404).send(err)
      })
  }
}

module.exports = controller;