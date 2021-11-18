const pool = require('./connection.js')

const helper = {
  // Questions
  getFullQuestionResponse: (productId, page = 1, count = 5) => {
    let response = {
      product_id: productId,
      results: []
    }
    return new Promise((resolve, reject) => {
      helper.getQuestions(productId, page, count)
        .then(questions => {
          helper.getAnswers(questions.map((question) => question.id))
            .then(answers => {
              helper.getPhotos(answers.map((answer) => answer.id))
                .then(photos => {
                  for (question of questions) {
                    if (question.reported === 0) { question.reported = false }
                    if (question.reported === 1) { question.reported = true }
                    let questionSkeleton = {
                      question_id: question.id,
                      question_body: question.body,
                      question_date: question.date_written,
                      asker_name: question.asker_name,
                      question_helpfulness: question.helpful,
                      reported: question.reported,
                      answers: {}
                    }
                    response.results.push(questionSkeleton);
                  }
                  for (answer of answers) {
                    let answerSkeleton = {
                      id: answer.id,
                      body: answer.body,
                      date: answer.date_written,
                      answerer_name: answer.answerer_name,
                      helpfulness: answer.helpful,
                      photos: []
                    }
                    for (photo of photos) {
                      if (photo.answer_id = answer.id) {
                        let photosSkeleton = {
                          id: photo.id,
                          url: photo.url
                        }
                        answerSkeleton.photos.push(photosSkeleton);
                      }
                    }
                    for (question of response.results) {
                      if (answer.question_id === question.question_id) {
                        question.answers[answer.id] = answerSkeleton;
                      }
                    }
                  }
                  resolve(response)
                })
            })
        })
    })
  },

  getQuestions: (productId, page = 1, count = 5) => {
    const questionsQ = `select * from questions where product_id=${productId} LIMIT ${count * page};`
    return new Promise((resolve, reject) => {
      pool.query(questionsQ, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  addQuestion: (data) => {
    const q = `INSERT INTO questions (product_id, body, date_written, asker_name, asker_email) VALUES (${data.product_id}, '${data.body}', CURRENT_TIMESTAMP, '${data.asker_name}', '${data.asker_email}');`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  helpfulQuestion: (questionId) => {
    const q = `UPDATE questions SET helpful = helpful + 1 where id = ${questionId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  reportQuestion: (questionId) => {
    const q = `UPDATE questions SET reported = reported + 1 where id = ${questionId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  // Answers
  getFullAnswerResponse: (questionId, page = 1, count = 5) => {
    let response = {
      question: questionId,
      page: page,
      count: count,
      results: []
    }
    return new Promise((resolve, reject) => {
      helper.getAnswers(questionId)
        .then(answers => {
          helper.getPhotos(answers.map((answer) => answer.id))
            .then(photos => {
              for (answer of answers) {
                let answerSkeleton = {
                  id: answer.id,
                  body: answer.body,
                  date: answer.date_written,
                  answerer_name: answer.answerer_name,
                  helpfulness: answer.helpful,
                  photos: []
                }
                for (photo of photos) {
                  if (photo.answer_id = answer.id) {
                    let photosSkeleton = {
                      id: photo.id,
                      url: photo.url
                    }
                    answerSkeleton.photos.push(photosSkeleton);
                  }
                }
                response.results.push(answerSkeleton);
              }
              resolve(response)
            })
        })
    })
  },

  getAnswers: (questionIds) => {
    return new Promise((resolve, reject) => {
      if (Array.isArray(questionIds)) {
        const ids = questionIds.join(',');
        const q = `SELECT * FROM answers where question_id IN (${ids})`;
        pool.query(q, (err, results) => {
          if (err) { reject(err) }
          else { resolve(results) }
        })
      } else {
        const q = `SELECT * FROM answers WHERE question_id = ${questionIds};`;
        pool.query(q, (err, results) => {
          if (err) { reject(err) }
          else { resolve(results) }
        })
      }
    })
  },

  addAnswer: (questionId, data) => {
    const q = `INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email) VALUES (${questionId}, '${data.body}', CURRENT_TIMESTAMP, '${data.answerer_name}', '${data.answerer_email}');`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  helpfulAnswer: (answerId) => {
    const q = `UPDATE answers SET helpful = helpful + 1 where id = ${answerId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  reportAnswer: (answerId) => {
    const q = `UPDATE answers SET reported = reported + 1 where id = ${answerId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  // Photos
  getPhotos: (answerIds) => {
    const ids = answerIds.join(',');
    const q = `SELECT * FROM photos where answer_id IN (${ids});`
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  addPhotos: (url) => {
    const q = `INSERT INTO photos (answer_id, url) VALUES ( (SELECT id FROM answers WHERE id = (SELECT MAX(id) FROM answers) ), '${url}');`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  }
}

module.exports = helper;