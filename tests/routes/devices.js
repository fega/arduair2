/* eslint-env node, mocha */
const request = require('supertest')
const expect = require('chai').expect
const app = require('../../app.js')

describe('/devices', () => {
  describe('GET /devices', () => {
    it('Respond with JSON', (done) => {
      request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200, done)
    })
  })
})
