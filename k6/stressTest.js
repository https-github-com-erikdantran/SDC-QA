import http from 'k6/http';
import { sleep, check } from 'k6';

// max product id = 900009  to 1000011
// max question id = 3167066 to 3518963
// max answer id = 6191375 to 6879306

export const options = {
  vus: 100,
  duration: '15s',
};

const postQPayload = {
  "product_id": "1",
  "body": "Helloo",
  "asker_name": "Erik",
  "asker_email": "erik@gmail.com",
  "photos": ["qweqwe", "qweqweqw"]
}
const postAPayload = {
  "body": "wow",
  "name": "Erik",
  "email": "Erik@gmail.com",
  "photos": ["qweqc", "wefwev"]
}

const postParams = {
  headers: { 'Content-Type': 'application/json' }
}


export default function () {
  const route = Math.floor(Math.random() * 8) + 1;
  const randomProductId = Math.floor(Math.random() * 1000011) + 1;
  const randomQuestionId = Math.floor(Math.random() * 3518963) + 1;
  const randomAnswerId = Math.floor(Math.random() * 6879306) + 1;

  const getQuestions = `http://localhost:3001/qa/questions/?product_id=${randomProductId}&count=100`
  const postQuestion = `http://localhost:3001/qa/questions`
  const helpfulQuestion = `http://localhost:3001/qa/questions/${randomQuestionId}/helpful`
  const reportQuestion = `http://localhost:3001/qa/questions/${randomQuestionId}/report`

  const getAnswers = `http://localhost:3001/qa/questions/${randomQuestionId}/answers`
  const postAnswer = `http://localhost:3001/qa/questions/${randomQuestionId}/answers`
  const helpfulAnswer = `http://localhost:3001/qa/answers/${randomAnswerId}/helpful`
  const reportAnswer = `http://localhost:3001/qa/answers/${randomAnswerId}/report`
  let getRes = null
  let postRes = null
  let putRes = null


  if (route) {
    getRes = http.get(getQuestions)
  } else if (route === 2) {
    // getRes = http.get(getAnswers)
  } else if (route === 3) {
    // postRes = http.post(postQuestion, JSON.stringify(postQPayload), postParams)
  } else if (route === 4) {
    // postRes = http.post(postAnswer, JSON.stringify(postAPayload), postParams)
  } else if (route === 5) {
    // putRes = http.put(helpfulQuestion)
  } else if (route === 6) {
    // putRes = http.put(reportQuestion)
  } else if (route === 7) {
    // putRes = http.put(helpfulAnswer)
  } else {
    // putRes = http.put(reportAnswer)
  }

  if (getRes) {
    check(getRes, {
      'is status 200': r => r.status === 200,
      'transaction time < 50s': r => r.timings.duration < 50,
      'transaction time < 200ms': r => r.timings.duration < 200,
      'transaction time < 500ms': r => r.timings.duration < 500,
      'transaction time < 1000ms': r => r.timings.duration < 1000,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
    });
  }

  if (postRes) {
    check(postRes, {
      'is status 201': r => r.status === 201,
      'transaction time < 50s': r => r.timings.duration < 50,
      'transaction time < 200ms': r => r.timings.duration < 200,
      'transaction time < 500ms': r => r.timings.duration < 500,
      'transaction time < 1000ms': r => r.timings.duration < 1000,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
    });
  }

  if (putRes) {
    check(putRes, {
      'is status 204': r => r.status === 204,
      'transaction time < 50s': r => r.timings.duration < 50,
      'transaction time < 200ms': r => r.timings.duration < 200,
      'transaction time < 500ms': r => r.timings.duration < 500,
      'transaction time < 1000ms': r => r.timings.duration < 1000,
      'transaction time < 2000ms': r => r.timings.duration < 2000,
    });
  }

  sleep(0.1);
}
