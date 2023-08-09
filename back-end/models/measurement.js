const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  exclusionLimit: { type: Number, default: 0 },
  flowSpecification: { type: Number, default: 0.01 },
  ionicCapacity: { type: Number, default: 0 },
  particleCount: { type: Number, default: 0 },
  avgParticleRadius: { type: Number, default: 0 },
  totalYield: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
