const moment = require('moment');
const mongoose = require('mongoose');
const { aqi } = require('aqi-plus');

// o3_8h
// o3_1h
// pm10_24h
// pm25_24h
// co_8h
// so2_24h
// so2_1h
// no2_1h
const Schema = mongoose.Schema;
const dateSetter = date => moment(date).toDate();
const dateValidator = date => moment(date).isValid();
module.exports = new Schema({
  device: {
    type: String,
    maxlength: [10, 'device name should have less than 10 characters'],
    minlength: 1,
    required: true },
  d: {
    type: Date,
    required: true,
    set: dateSetter,
    validate: {
      validator: dateValidator,
      message: '{VALUE} is not a valid date or dateString',
    } }, // measure dates
  h: { type: Number }, // humidity in %
  t: { type: Number }, // temperature in °C
  p: { type: Number }, // presure in ¿¿mb??
  l: { type: Number }, // location in geographic coordinates
  pm10: { type: Number }, // P.M. 10 in ug/m3
  pm25: { type: Number }, // P.M. 2.5 in ug/m3
  so2: { type: Number }, // SO2
  no2: { type: Number }, // NO2
  o3: { type: Number }, // O3
  co: { type: Number }, // CO
  apm10: { type: Number }, // AQI P.M. 10 in ug/m3
  apm25: { type: Number }, // AQI P.M. 2.5 in ug/m3
  aso2: { type: Number }, // AQI SO2
  ano2: { type: Number }, // AQI NO2
  ao3: { type: Number }, // AQI O3
  aco: { type: Number }, // AQI CO
}).pre('save', function aqiSetter(next) {
  this.apm10 = aqi(this.get('pm10'), 'pm10_24h') || undefined;
  this.apm25 = aqi(this.get('pm25'), 'pm25_24h') || undefined;
  this.aso2 = aqi(this.get('so2'), 'so2_1h') || undefined;
  this.ano2 = aqi(this.get('no2'), 'no2_1h') || undefined;
  this.ao3 = aqi(this.get('o3'), 'o3_1h') || undefined;
  this.aco = aqi(this.get('co'), 'co_8h') || undefined;
  next();
});
