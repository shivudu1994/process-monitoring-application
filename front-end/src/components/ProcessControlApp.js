import React, { useState, useEffect } from 'react';
import RecordForm from './RecordForm';
import MeasurementChart from './MeasurementChart';
import './process-control-app.css';

function ProcessControlApp() {
  const [displayMeasurements, setDisplayMeasurements] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  const handleSubmit = (data) => {
    setMeasurements([...measurements, data]);
  };

  useEffect(() => {
    fetch('http://localhost:5005/api/measurements')
      .then((response) => response.json())
      .then((data) => setMeasurements(data))
      .catch((error) => console.error('Failed to fetch measurements:', error));
  }, []);

  return (
    <div>
      <header className="header">
        <div className="header-title">Process Control App</div>
        <div className="header-links">
          <button
            className={`header-link ${!displayMeasurements ? 'active' : ''}`}
            onClick={() => setDisplayMeasurements(false)}
          >
            Records
          </button>
          <button
            className={`header-link ${displayMeasurements ? 'active' : ''}`}
            onClick={() => setDisplayMeasurements(true)}
          >
            Measurements
          </button>
        </div>
      </header>
      <div className="process-control-app">
        <div className="sidebar">
        </div>
        <div className="content">
          {displayMeasurements ? (
            <MeasurementChart measurements={measurements} />
          ) : (
            <RecordForm onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessControlApp;
