/* eslint-env node, mocha */

const request = require('supertest')
const chai = require('chai')
const expect = require('chai').expect
const chaiSubset = require('chai-subset')
const app = require('../../src/app')
const mongoose = require('mongoose')
const {end, getJsonExpect, postJsonExpect, patchJsonExpect, putJsonExpect, deleteJsonExpect} = require('./super-test-shortcuts')

chai.use(chaiSubset)

let newDevice = {
  device: 'newDevice',
  password: 'pass',
  description: 'some description'
}
let noNameDevice = {
  password: 'pass',
  description: 'some description'
}
let noPassDevice = {
  device: 'newOtherDevice',
  description: 'some description'
}
let updateDevice = {
  description: 'Awesome description'
}
describe('/devices', () => {
  describe('GET /devices', () => {
    it('Respond with JSON with devices', (done) => {
      getJsonExpect(app, '/devices', 200)
      .expect(res => {
        expect(res.body).to.have.any.keys({'status': 'success'})
        expect(res.body).to.have.any.keys('data')
        expect(res.body.data).to.have.all.keys('devices')
      })
      .expect(200, done)
    })
  })
  describe('POST /devices', function (done) {
    it('Should create a new device', done => {
      postJsonExpect(app, '/devices', 201, newDevice)
        .expect(res => {
          let json = res.body
          let device = json.data.device
          let subset = { status: 'success', code: 201 }
          let expectKeys = ['data', 'message']

          let expectKeysDevice = ['createdAt', 'updatedAt']
          let subsetDevice = { device: newDevice.device, password: '', description: newDevice.description }
          expect(json).to.containSubset(subset)
          expect(json).to.have.contain.all.keys(expectKeys)
          expect(device).to.have.contain.all.keys(expectKeysDevice)
          expect(device).to.containSubset(subsetDevice)
        })
        .end(end(done))
    })
    it('Should not create a duplicate device', done => {
      postJsonExpect(app, '/devices', 409, newDevice)
        .expect(res => {
          let json = res.body
          expect(json).to.have.any.keys(['code', 'status'])
          expect(json).to.have.not.any.keys('data')
        })
        .end(end(done))
    })
    it('Should not create a device without name', done => {
      postJsonExpect(app, '/devices', 400, noNameDevice)
        .expect(res => {
          let json = res.body
          expect(json).to.have.any.keys(['code', 'status'])
          expect(json).to.have.not.any.keys('data')
        })
        .end(end(done))
    })
    it('Should not create a device without password', done => {
      postJsonExpect(app, '/devices', 400, noPassDevice)
        .expect(res => {
          let json = res.body
          expect(json).to.have.any.keys(['code', 'status'])
          expect(json).to.have.not.any.keys('data')
        })
        .end(end(done))
    })
  })

  describe('GET /devices/:device', () => {
    it('Should get the requested device', done => {
      getJsonExpect(app, '/devices/newDevice', 200)
      .expect(res => {
        let subsetDevice = {
          device: 'newDevice',
          resetclock: false
        }
        expect(res.body).to.have.not.any.keys('password')
        expect(res.body).to.have.any.keys({'status': 'success'})
        expect(res.body).to.have.any.keys('data')
        expect(res.body.data).to.have.all.keys('device')
        expect(res.body.data.device).to.containSubset(subsetDevice)
      })
      .expect(200, done)
    })
  })

  describe('PATCH /devices/:device', function (done) {
    it('Should update an existing device', done => {
      patchJsonExpect(app, '/devices/newDevice', 200, updateDevice)
        .expect(res => {
          let json = res.body
          let subset = {
            status: 'success',
            code: 200
          }
          expect(json).to.containSubset(subset)
        })
        .end(end(done))
    })
  })
  describe('DELETE /devices/:device', function (done) {
    it('Should delete an existing device', done => {
      request(app)
        .delete('/devices/newDevice')
        .type('json')
        .set('Accept', /application\/json/)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(end(done))
    })
    it('Should alert if the device isnt exist', done => {
      deleteJsonExpect(app, '/devices/newDevice', 404)
        .end(end(done))
    })
  })
  describe(' PUT  /devices', function (done) {
    it('Should send 501 not implemented', done => {
      putJsonExpect(app, '/devices', 501)
      .end(end(done))
    })
  })
})
after(function (done) {
  mongoose.models.device.findOneAndRemove({device: newDevice.device}).then(v => {
    console.log('Test device deleted')
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
  })
})
