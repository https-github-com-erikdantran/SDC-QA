const pool = require('./connection.js')

const helper = {
  // Questions
  getFullQuestionResponse: (productId, page = 1, count = 5) => {
    let response = {
      product_id: productId,
      results: []
    };
    return new Promise((resolve, reject) => {
      const q = `SELECT q.q_id, q.question_body, q_date_written, q.asker_name, q.q_helpful, q.q_reported,
      a.a_id, a.answer_body, a.a_date_written, a.answerer_name, a.a_helpful, a.a_reported,
      p.p_id, p.url
      FROM questions q
      LEFT JOIN answers a ON a.question_id=q.q_id
      LEFT JOIN photos p ON p.answer_id=a.a_id
      WHERE q.product_id=${productId} LIMIT ${count * page};`;
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else {
          let template = {};

          for (result of results) {
            if (!template[result.q_id]) {
              if (result.q_reported === 0) { result.q_reported = false }
              if (result.q_reported === 1) { result.q_reported = true }
              template[result.q_id] = {
                question_id: result.q_id,
                question_body: result.question_body,
                question_date: result.q_date_written,
                asker_name: result.asker_name,
                question_helpfulness: result.q_helpful,
                reported: result.q_reported,
                answers: {}
              }
            }

            if (result.a_id) {
              template[result.q_id].answers[result.a_id] = {
                id: result.a_id,
                body: result.answer_body,
                date: result.a_date_written,
                answerer_name: result.answerer_name,
                helpfulness: result.a_helpful,
                photos: []
              }
            }

            if (result.p_id) {
              template[result.q_id].answers[result.a_id].photos.push({
                id: result.p_id,
                url: result.url
              })
            }
          }

          Object.values(template).forEach(question => response.results.push(question))

          resolve(response)
        }
      })
    })
  },

  addQuestion: (data) => {
    const q = `INSERT INTO questions (product_id, question_body, q_date_written, asker_name, asker_email) VALUES (${data.product_id}, '${data.body}', CURRENT_TIMESTAMP, '${data.asker_name}', '${data.asker_email}');`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  helpfulQuestion: (questionId) => {
    const q = `UPDATE questions SET q_helpful = q_helpful + 1 where q_id = ${questionId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  reportQuestion: (questionId) => {
    const q = `UPDATE questions SET q_reported = true where q_id = ${questionId};`;
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
      const q = `SELECT *
      FROM answers a
      LEFT JOIN photos p ON a.a_id = p.answer_id
      WHERE a.question_id = ${questionId}
      LIMIT ${page * count};`
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else {
          let template = {};
          for (result of results) {
            if (!template[result.a_id]) {
              template[result.a_id] = {
                answer_id: result.a_id,
                body: result.answer_body,
                date: result.a_date_written,
                answerer_name: result.answerer_name,
                helpfulness: result.a_helpful,
                photos: []
              }
            }
            if (result.p_id) {
              template[result.a_id].photos.push({
                id: result.p_id,
                url: result.url
              })
            }
          }
          Object.values(template).forEach(answer => response.results.push(answer));
          resolve(response);
        }
      })
    })
  },

  addAnswer: (questionId, data) => {
    const q = `INSERT INTO answers (question_id, answer_body, a_date_written, answerer_name, answerer_email) VALUES (${questionId}, '${data.body}', CURRENT_TIMESTAMP, '${data.answerer_name}', '${data.answerer_email}');`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  helpfulAnswer: (answerId) => {
    const q = `UPDATE answers SET a_helpful = a_helpful + 1 where a_id = ${answerId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  reportAnswer: (answerId) => {
    const q = `UPDATE answers SET a_reported = true where a_id = ${answerId};`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  },

  // Photos

  addPhotos: (url) => {
    const q = `INSERT INTO photos (answer_id, url) VALUES ( (SELECT a_id FROM answers WHERE a_id = (SELECT MAX(a_id) FROM answers) ), '${url}');`;
    return new Promise((resolve, reject) => {
      pool.query(q, (err, results) => {
        if (err) { reject(err) }
        else { resolve(results) }
      })
    })
  }
}

module.exports = helper;