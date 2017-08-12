const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.types.ObjectId;

module.exports = new Schema({
  device: { type: ObjectId, required: true },
  d: { type: Date, default: null, required: true }, // measure dates
  h: { type: Number, default: null }, // humidity in %
  t: { type: Number, default: null }, // temperature in °C
  p: { type: Number, default: null }, // presure in ¿¿mb??
  l: { type: Number, default: null }, // location in geographic coordinates
  pm10: { type: Number, default: null }, // P.M. 10 in ug/m3
  pm25: { type: Number, default: null }, // P.M. 2.5 in ug/m3
  so2: { type: Number, default: null }, // SO2
  no2: { type: Number, default: null }, // NO2
  o3: { type: Number, default: null }, // O3
  co: { type: Number, default: null }, // CO
  apm10: { type: Number, default: null }, // P.M. 10 in ug/m3
  apm25: { type: Number, default: null }, // P.M. 2.5 in ug/m3
  aso2: { type: Number, default: null }, // SO2
  ano2: { type: Number, default: null }, // NO2
  ao3: { type: Number, default: null }, // O3
  aco: { type: Number, default: null }, // CO
});
