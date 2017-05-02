/* eslint-env node, mocha */
const request = require('supertest')
const expect = require('chai').expect
const app = require('../../app.js')

describe('/devices', () => {
  describe('GET /devices', () => {
    it('Respond with JSON', (done) => {
      request(app)
      .get('/devices')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.have.any.keys({'status': 'success'})
        expect(res.body).to.have.any.keys('data')
        expect(res.body.data).to.have.all.keys('devices')
      })
      .expect(200, done)
    })
  })
})
