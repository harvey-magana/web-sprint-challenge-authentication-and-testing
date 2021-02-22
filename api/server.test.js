
const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

let token;

beforeAll((done) => {
  request(server)
    .post('/login')
    .send({
      username: 'utah2020',
      password: 'password1234'
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    })
})

beforeEach(async () => {
  await db('users').truncate();
})
  
afterAll(async () => {
  await db.destroy();
})


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {
  it('we are in the testing env', () => {
    expect(process.env.NODE_ENV).toBe('testing');
  })
})

describe('GET /api/auth', () => {
  test('It should require authentication', () => {
    return request(server)
      .get('/api/auth')
      .then((response) => {
        expect(response.statusCode).toBe(404)
      })
  })

  /*
  test('Test accessing jokes page', () => {
    return request(server).get('/api/jokes').then((response) => {expect(response.status).toBe(200)})
  })
  */
})

