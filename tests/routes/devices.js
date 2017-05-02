/* eslint-env node, mocha */
const request = require('supertest')
const expect = require('chai').expect
const app = require('../../src/app')

describe('/devices', () => {
  describe('GET /devices', () => {
    it('Respond with JSON with devices', (done) => {
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
  describe('GET /devices/:device', () => {
    it('Should get the requested device')
  })
  describe('POST /devices', function (done) {
    it('Should create a new device')
    it('Should not create a duplicate device')
    it('Should not create a device without name')
    it('Should not create a device without password')
  })
  describe('PUT /devices/:device', function (done) {
    it('Should update an existing device')
    it('Should not create a new device')
  })
  describe('DELETE /devices/:device', function (done) {
    it('Should delete an existing device')
    it('Should alert if the device isnt exist')
  })
  describe(' PATCH  /devices',function(done){
    it('Should send 501 not implemented')
  })
})
