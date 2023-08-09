const express = require('express');
const router = express.Router();
const Measurement = require('../models/measurement');

router.post('/', async (req, res) => {
  try {
    const newMeasurement = new Measurement(req.body);
    await newMeasurement.save();
    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to store measurement' });
  }
});

router.get('/', async (req, res) => {
  try {
    const measurements = await Measurement.find().sort({ date: -1 });
    res.status(200).json(measurements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get measurements' });
  }
});

module.exports = router;
