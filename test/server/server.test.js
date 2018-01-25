const request = require('supertest');

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

const app = require('../../server/server');

test('/ responds with 200 status code', () => {
  request(HOST)
    .get('/')
    .then(res => {
      expect(res.status).toBe(200);
    })
});
