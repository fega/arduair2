const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = new Schema({
  device: { type: String, maxlength: 10, minlength: 1 }, // device name
  password: { type: String, minlength: 1 }, // device password
  description: {type: String, default: 'An arduair device'}, // device description
  owner: { type: String, minlength: 1 }, // device owner
  email: {type: String, set: v => v.toLowerCase()}, // owner email
  network: String,
  networkpass: String,
  server: {type: String, default: 'arduair.herokuapp.com', set: v => v.toLowerCase()},
  resetclock: {type: Boolean, default: false},
  year: Number,
  month: Number,
  day: Number,
  hour: Number,
  minute: Number,
  second: Number,
  pm10_x2: Number,
  pm10_x1: Number,
  pm10_b: Number,
  pm25_x2: Number,
  pm25_x1: Number,
  pm25_b: Number,
  co_x2: Number,
  co_x1: Number,
  co_b: Number,
  o3_x2: Number,
  o3_x1: Number,
  o3_b: Number,
  so2_x2: Number,
  so2_x1: Number,
  so2_b: Number,
  no2_x2: Number,
  no2_x1: Number,
  no2_b: Number,
  h_x1: Number,
  h_b: Number,
  p_x1: Number,
  p_b: Number,
  t_x1: Number,
  t_b: Number,
  l_x1: Number,
  l_b: Number
}, {
  timestamps: true
})
