const supertest = require('supertest');
const app = require('../mockServer.js');

// Questions
test('Check getFullQuestions response', async () => {
  await supertest(app).get('/qa/questions/?product_id=1000011&count=100')
    .expect(200)
    .then(res => {
      expect(res.body.product_id).toBe('1000011')
      expect(res.body.results[0].question_id).toBe(3518961)
      expect(res.body.results[0].answers[6879302].id).toBe(6879302)
      expect(res.body.results[0].answers[6879302].photos.length).toBe(0)
    })
})

test('Check addQuestion response', async () => {
  let question = {
    product_id: 1,
    body: "Helloo",
    asker_name: "Erik",
    asker_email: "erik@gmail.com",
  }
  await supertest(app).post('/qa/questions')
    .send(question)
    .expect(201)
})

test('Check helpfulQuestion response', async () => {
  await supertest(app).put('/qa/questions/3518961/helpful')
    .expect(204)
})

test('Check reportQuestion response', async () => {
  await supertest(app).put('/qa/questions/3518961/report')
    .expect(204)
})

// Answers
test('Check getFullAnswers response', async () => {
  await supertest(app).get('/qa/questions/1/answers')
    .expect(200)
    .then(res => {
      expect(res.body.question).toBe('1')
      expect(res.body.results[0].id).toBe(5)
      expect(res.body.results[0].photos[0].id).toBe(1)
    })
})

test('Check addAnswer response', async () => {
  let answer = {
    question_id: 1,
    body: "Helloo",
    answerer_name: "Erik",
    answerer_email: "erik@gmail.com",
    photos: ["qweqwe", "qweqweqw"]
  }
  await supertest(app).post('/qa/questions/1/answers')
    .send(answer)
    .expect(201)
})

test('Check helpfulAnswer response', async () => {
  await supertest(app).put('/qa/answers/1/helpful')
    .expect(204)
})

test('Check reportAnswer response', async () => {
  await supertest(app).put('/qa/answers/1/report')
    .expect(204)
})