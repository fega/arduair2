 /* eslint-env node, mocha */
const chai = require('chai');
const moment = require('moment');
const request = require('supertest');
const expect = require('chai').expect;
const chaiSubset = require('chai-subset');
const { end } = require('./super-test-shortcuts');


const app = require('../../src/app');
const Device = require('../../src/models/device');
const Record = require('../../src/models/records');

chai.use(chaiSubset);
const previous = (arr, index) => arr[index - 1];
const isOrderedByDate = dateArr => dateArr.every((val, index, arr) => {
  if (index === 0) return true;
  return moment(val).isSameOrAfter(previous(arr, index));
});

const device = {
  device: 'namme',
  owner: 'fabian',
  password: 'pass',
  email: 'email@gmail.com',
};

describe('/devices/:deviceId/records/', () => {
  before(async () => {
    await Device.create(device);
    await Record.create({
      device: device.device,
      d: '2010-10-10T10:00:00',
      apm10: 5,
      pm10: 5,
    });
    await Record.create({
      device: device.device,
      d: '2010-10-11T10:00:00',
      apm10: 5,
      pm10: 5,
    });
    await Record.create({
      device: `${device.device}a`,
      d: '2010-10-11T10:00:00',
      apm10: 5,
      pm10: 5,
    });
    await Record.create({
      device: device.device,
      d: '2010-10-13T10:00:00',
      pm10: 5,
      apm10: 5,
    });
  });
  after(() => {

  });
  describe('GET /', () => {
    it('Respond with JSON with records of the device',
      (done) => {
        request(app)
        .get(`/devices/${device.device}/records`)
        .expect(200)
        .expect((res) => {
          const { records } = res.body.data;
          expect(records).lengthOf(3);
          expect(records[0]).to.have.any.keys(['_id', 't']);
          expect(res.body).to.containSubset({
            status: 'success',
          });
        })
        .end(end(done));
      },
      );
    it('Organice responses by date',
    (done) => {
      request(app)
      .get(`/devices/${device.device}/records`)
      .expect(200)
      .expect((res) => {
        const { records } = res.body.data;
        const dates = records.map(record => record.d);
        expect(isOrderedByDate(dates), 'errors NOT sorted').equal(true);
      })
      .end(end(done));
    });
    it('Should filter using "from" and "to" query params', (done) => {
      request(app)
      .get(`/devices/${device.device}/records`)
      .query({
        from: '2010-10-10T00:00:00',
        to: '2010-10-13T16:00:00',
      })
      .expect(200)
      .expect((res) => {
        const { records } = res.body.data;
        expect(records).lengthOf(3);
      })
      .end(end(done));
    });
  });
  describe('POST /devices/:deviceId/records', () => {
    it('Should Post a record', (done) => {
      request(app)
      .post(`/devices/${device.device}/records`)
      .send({
        password: device.password,
        d: '2010-10-13T10:00:00',
        pm10: 5,
      })
      .expect(200)
      .end(end(done));
    });
    it('Should not post an invalid password', (done) => {
      request(app)
      .post(`/devices/${device.device}/records`)
      .send({
        password: 'assdksa',
        d: '2010-10-10T10:00:00',
        pm10: 5,
      })
      .expect(400)
      .end(end(done));
    });
    it('Should not create a record in a not found device', (done) => {
      request(app)
      .post('/devices/random/records')
      .send({
        password: device.password,
        d: '2010-10-13T10:00:00',
        pm10: 5,
      })
      .expect(404)
      .end(end(done));
    });
    it('Should not create a record without if date parameters are invalid', (done) => {
      request(app)
      .post(`/devices/${device.device}/records`)
      .send({
        device: device.device,
        password: device.password,
        d: '2010-40-40T11:00:00',
        pm10: 5,
      })
      .expect(400)
      .end(end(done));
    });
  });
  describe('GET (post) /records/:device/:password/:day/:month/:year/:hour/:minute?params=values', () => {
    it('Should create a new record');
    it('Should not create a record in a not found device');
    it('Should not create a record without device/pass match');
    it('Should not create a record without if date parameters are invalid');
  });
  describe('PUT PATCH DELETE /device/:deviceId/records', () => {
    it('Should send 501 not implemented', (done) => {
      request(app)
      .put(`/devices/${device.device}/records/id`)
      .expect(501, done);
    });
  });
});
