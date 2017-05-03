/*eslint-disable*/
const colors = require('colors')
const request = require('supertest')
/*eslint-enable*/

let end = (done, text) => (err, res) => {
  if (err) {
    console.log('RESULTADO'.yellow)
    console.log(res.body)
    return done(err)
  }
  done()
}
let getJsonExpect = (app, route, expect) => {
  return request(app)
  .get(route)
  .expect('Content-Type', /json/)
  .expect(expect)
}
let postJsonExpect = (app, route, expect, data) => {
  return request(app)
    .post(route)
    .type('json')
    .send(data)
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect)
}
let patchJsonExpect = (app, route, expect, data) => {
  return request(app)
    .patch(route)
    .type('json')
    .send(data)
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect)
}
let deleteJsonExpect = (app, route, expect) => {
  return request(app)
    .del(route)
    .type('json')
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect)
}
let putJsonExpect = (app, route, expect, data) => {
  return request(app)
    .put(route)
    .type('json')
    .set('Accept', /application\/json/)
    .expect('Content-Type', /json/)
    .expect(expect)
}
module.exports = {
  end,
  getJsonExpect,
  postJsonExpect,
  patchJsonExpect,
  deleteJsonExpect,
  putJsonExpect
}
