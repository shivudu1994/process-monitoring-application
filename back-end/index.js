const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5001;
const cors = require('cors');

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/process-monitoring-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


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

app.post('/api/measurements', async (req, res) => {
  try {
    const newMeasurement = new Measurement(req.body);
    await newMeasurement.save();
    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to store measurement' });
  }
});


  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

