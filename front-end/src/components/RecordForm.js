import React, { useState } from 'react';
import './RecordForm.css';

function RecordForm({ onSubmit }) {
  const [exclusionLimit, setExclusionLimit] = useState(0);
  const [flowSpec, setFlowSpec] = useState(0.01);
  const [ionicCapacity, setIonicCapacity] = useState(0);
  const [particleCount, setParticleCount] = useState(0);
  const [avgParticleRadius, setAvgParticleRadius] = useState(0);
  const [totalYield, setTotalYield] = useState(0);

  const exclusionLimitWarning =
    exclusionLimit < 1e7 || exclusionLimit > 1e8
      ? 'Value should be between 1e7 and 1e8'
      : '';
  const flowSpecWarning =
    flowSpec < 0.01 || flowSpec > 150 ? 'Value should be between 0.01 and 150' : '';
  const ionicCapacityWarning =
    ionicCapacity < 0.03 || ionicCapacity > 0.18
      ? 'Value should be between 0.03 and 0.18'
      : '';

const handleTotalYieldChange = (e) => {
    const newTotalYield = parseFloat(e.target.value);
    const newParticleCount = (3 / (4 * Math.PI * Math.pow(avgParticleRadius, 3))) * newTotalYield;
    setTotalYield(newTotalYield);
    setParticleCount(newParticleCount);
  };
  const handleSubmit = async () => {
    const calculatedTotalYield =
      (4 / 3) * Math.PI * Math.pow(avgParticleRadius, 3) * particleCount;

    setTotalYield(calculatedTotalYield);
    if (
      exclusionLimitWarning ||
      flowSpecWarning ||
      ionicCapacityWarning
    ) {
      alert('Please correct the fields with warnings before submitting.');
      return;
    }

    const data = {
      exclusionLimit,
      flowSpec,
      ionicCapacity,
      particleCount,
      avgParticleRadius,
      totalYield: calculatedTotalYield,
    };

    try {
      const response = await fetch('http://localhost:5005/api/measurements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        onSubmit(data);
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="record-form">

      <div className="input-group">
        <div className="input-column">
          <label>Particle Count:</label>
          <input
            type="number"
            value={particleCount}
            onChange={(e) => setParticleCount(parseFloat(e.target.value))}
          />
        </div>
        <div className="input-column">
          <label>Avg Particle Radius:</label>
          <input
            type="number"
            value={avgParticleRadius}
            onChange={(e) => setAvgParticleRadius(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-column">
          <label>Exclusion Limit:</label>
          <input
            type="number"
            value={exclusionLimit}
            onChange={(e) => setExclusionLimit(parseFloat(e.target.value))}
          />
          <p className="warning">{exclusionLimitWarning}</p>
        </div>
        <div className="input-column">
          <label>Flow Specification:</label>
          <input
            type="number"
            value={flowSpec}
            onChange={(e) => setFlowSpec(parseFloat(e.target.value))}
          />
          <p className="warning">{flowSpecWarning}</p>
        </div>
      </div>

      <div className="input-group">
  <div className="input-column">
    <label>Ionic Capacity:</label>
    <input
      type="number"
      step="0.01"  
      value={ionicCapacity}
      onChange={(e) => setIonicCapacity(parseFloat(e.target.value))}
    />
    <p className="warning">{ionicCapacityWarning}</p>
  </div>
  <div className="input-column">
          <label>Total Yield:</label>
          <input
            type="number"
            value={totalYield}
            onChange={handleTotalYieldChange}
          />
        </div>
</div>

      <button className="submit-button" onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default RecordForm;
