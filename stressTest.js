import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 30,
  duration: '15s',
};
                    //  localhost:3001/qa/questions/?product_id=10012&count=100
const getQuestionsUrl = `http://localhost:3001/qa/questions/?product_id=100012&count=100`
const helpfulQuestionUrl = `http://localhost:3001/qa/questions/1041/helpful`

export default function () {
  const res = http.get(getQuestionsUrl);
  check(res, {
    'is status 200': r => r.status === 200,
    'transaction time < 200ms': r => r.timings.duration < 200,
    'transaction time < 500ms': r => r.timings.duration < 500,
    'transaction time < 1000ms': r => r.timings.duration < 1000,
    'transaction time < 2000ms': r => r.timings.duration < 2000,
  });

  sleep(0.1);
}