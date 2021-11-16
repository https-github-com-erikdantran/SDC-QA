const pool = require('./connection.js')

const helper = {
  // TO DO
  getQuestions: (productId, page = 1, count = 5) => {
    // const q = `SELECT * from `
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM questions WHERE id > 0 and id < 10;', (err, results) => {
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

  // TO DO, need to deal with photos
  getAnswers: (questionId, page = 1, count = 5) => {
    const q = ``;
    return new Promise((resolve, reject) => {
      pool.query('', (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
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

  addPhotos: (url) => {
    const q = `INSERT INTO photos (answer_id, url) VALUES ( (SELECT id FROM answers WHERE id = (SELECT MAX(id) FROM answers) ), '${url}');`;
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
}

module.exports = helper;