import request from 'supertest';
import app from './';

describe('GET requests', () => {
  test('responds with status 200 to a known languageCode', () => {
    return request(app).get('/en')
      .then((response) => { expect(response.statusCode).toBe(200) })
  });
  test('response is a five-letter word', () => {
    return request(app).get('/fr')
      .then((response) => { expect(response.text.length).toBe(5) });
  });
  test('responds with status 404 when requesting an unknown language', () => {
    return request(app).get('/klingon')
    .then((response) => { expect(response.statusCode).toBe(404) });
  })
})