/*eslint-disable*/
const colors = require('colors')
const request = require('supertest')
/*eslint-enable*/

const end = (done, text) => (err, res) => {
  if (err) {
    return done(err);
  }
  console.log('RESULTADO'.yellow);
  console.log(res.body);
  done();
};
const getJsonExpect = (app, route, expect) => request(app)
  .get(route)
  .expect('Content-Type', /json/)
  .expect(expect);
const postJsonExpect = (app, route, expect, data) => request(app)
    .post(route)
    .type('json')
    .send(data)
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect);
const patchJsonExpect = (app, route, expect, data) => request(app)
    .patch(route)
    .type('json')
    .send(data)
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect);
const deleteJsonExpect = (app, route, expect) => request(app)
    .del(route)
    .type('json')
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect);
const putJsonExpect = (app, route, expect, data) => request(app)
    .put(route)
    .type('json')
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect);
module.exports = {
  end,
  getJsonExpect,
  postJsonExpect,
  patchJsonExpect,
  deleteJsonExpect,
  putJsonExpect,
};
