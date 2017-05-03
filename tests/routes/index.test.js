/* eslint-env node, mocha */
const request = require('supertest')
const app = require('../../src/app')

describe('/', () => {
  describe('GET /', () => {
    it('Respond with an HTML', (done) => {
      request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect('Content-Type', /charset/)
      // .expect('Server', /Arduair/)
      .expect(200)
      .expect(200, done)
    })
  })
})
