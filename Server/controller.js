const helper = require('../Database/helper.js');

const controller = {
  getQuestions: (req, res) => {
    helper.getFullQuestionResponse(req.query.product_id, req.query.page, req.query.count)
      .then(results => {
        res.status(200).send(results)
      })
      .catch(err => {
        res.status(404).end()
      })
  },

  addQuestion: (req, res) => {
    helper.addQuestion(req.body)
      .then(results => {
        res.status(201).send('Successfully posted question');
      })
      .catch(err => {
        console.log(err)
      })
  },

  helpfulQuestion: (req, res) => {
    helper.helpfulQuestion(req.params.question_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        console.log(err)
      })
  },

  reportQuestion: (req, res) => {
    helper.reportQuestion(req.params.question_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        console.log(err)
      })
  },

  getAnswers: (req, res) => {
    helper.getFullAnswerResponse(req.params.question_id)
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        console.log(err)
      })
  },

  addAnswer: (req, res) => {
    // first have to insert answer then use answer ID to insert photos
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
        console.log(err)
      })
  },

  helpfulAnswer: (req, res) => {
    helper.helpfulAnswer(req.params.answer_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        console.log(err)
      })
  },

  reportAnswer: (req, res) => {
    helper.reportAnswer(req.params.answer_id)
      .then(results => {
        res.status(204).end();
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = controller;