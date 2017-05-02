/* eslint-env node, mocha */
const request = require('supertest')
const expect = require('chai').expect
const app = require('../../src/app')

describe('/registers/:device', () => {
  describe('GET /registers', () => {
    it('Respond with JSON with registers')
  })
  describe('POST /registers/:device/:password/:day/:month/:year/:hour/:minute?params=values', function (done) {
    it('Should create a new registry')
    it('Should not create a registry without device')
    it('Should not create a registry without device/pass match')
  })
  describe('PUT PATCH DELETE /registers',function(done){
    it('Should send 501 not implemented')
  });
})
