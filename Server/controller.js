const helper = require('./helper.js');

const controller = {
  // get questions
  getQuestions: (req, res) => {
    console.log(req.query)
    console.log(helper.getQuestions())

    res.send('hello')
  }
}

module.exports = controller;