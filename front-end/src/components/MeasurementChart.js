import React from 'react';
import Plot from 'react-plotly.js';

function MeasurementChart({ measurements }) {
  const dates = measurements.map((measurement) => measurement.date);
  const exclusionLimits = measurements.map((measurement) => measurement.exclusionLimit);
  const flowSpecs = measurements.map((measurement) => measurement.flowSpecification);
  const ionicCapacities = measurements.map((measurement) => measurement.ionicCapacity);
  const totalYields = measurements.map((measurement) => measurement.totalYield);

  const meanTotalYield = totalYields.reduce((sum, value) => sum + value, 0) / totalYields.length;
  const standardDeviation = Math.sqrt(
    totalYields.reduce((sum, value) => sum + Math.pow(value - meanTotalYield, 2), 0) / totalYields.length
  );

  return (
    <div>
      <Plot
        data={[
          {
            x: dates,
            y: exclusionLimits,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Exclusion Limit',
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield + standardDeviation),
            mode: 'lines',
            name: '1σ Upper',
            line: { dash: 'dash' },
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield - standardDeviation),
            mode: 'lines',
            name: '1σ Lower',
            line: { dash: 'dash' },
          },
        ]}
        layout={{
          title: 'Exclusion Limit Chart',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Value',
          },
          hovermode: 'closest',
        }}
      />
      <Plot
        data={[
          {
            x: dates,
            y: flowSpecs,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Flow Specification',
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield + standardDeviation),
            mode: 'lines',
            name: '1σ Upper',
            line: { dash: 'dash' },
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield - standardDeviation),
            mode: 'lines',
            name: '1σ Lower',
            line: { dash: 'dash' },
          },
        ]}
        layout={{
          title: 'Flow Specification Chart',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Value',
          },
          hovermode: 'closest',
        }}
      />
      <Plot
        data={[
          {
            x: dates,
            y: ionicCapacities,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Ionic Capacity',
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield + standardDeviation),
            mode: 'lines',
            name: '1σ Upper',
            line: { dash: 'dash' },
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield - standardDeviation),
            mode: 'lines',
            name: '1σ Lower',
            line: { dash: 'dash' },
          },
        ]}
        layout={{
          title: 'Ionic Capacity Chart',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Value',
          },
          hovermode: 'closest',
        }}
      />
      <Plot
        data={[
          {
            x: dates,
            y: totalYields,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Total Yield',
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield),
            mode: 'lines',
            name: 'Mean Total Yield',
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield + standardDeviation),
            mode: 'lines',
            name: '1σ Upper',
            line: { dash: 'dash' },
          },
          {
            type: 'line',
            x: dates,
            y: Array(dates.length).fill(meanTotalYield - standardDeviation),
            mode: 'lines',
            name: '1σ Lower',
            line: { dash: 'dash' },
          },
        ]}
        layout={{
          title: 'Measurement Chart',
          xaxis: {
            title: 'Date',
          },
          yaxis: {
            title: 'Value',
          },
          hovermode: 'closest',
        }}
      />
    </div>
  );
}

export default MeasurementChart;
