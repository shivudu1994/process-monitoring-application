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

  const getWarning = (value) => {
    const deviation = Math.abs(value - meanTotalYield);
    const isOutOfControl = deviation > standardDeviation;
    const isBias = checkForBias(totalYields, value);

    let warnings = [];
    if (isOutOfControl) {
      warnings.push('Measurement out of control');
    }
    if (isBias) {
      warnings.push('A bias exists');
    }
    return warnings.join(', ');
  };

  function checkForBias(data, value) {
    const consecutiveSameSide = 9; 
    const side = value > meanTotalYield ? 1 : -1;
    let consecutiveCount = 0;

    for (let i = data.length - 1; i >= 0; i--) {
      if ((data[i] - meanTotalYield) * side > 0) {
        consecutiveCount++;
        if (consecutiveCount >= consecutiveSameSide) {
          return true;
        }
      } else {
        break;
      }
    }

    return false;
  }

  const exclusionLimitData = {
    x: dates,
    y: exclusionLimits,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Exclusion Limit',
    text: exclusionLimits.map(getWarning),
    hoverinfo: 'text+x+y',
  };

  const flowSpecData = {
    x: dates,
    y: flowSpecs,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Flow Specification',
    text: flowSpecs.map(getWarning),
    hoverinfo: 'text+x+y',
  };

  const ionicCapacityData = {
    x: dates,
    y: ionicCapacities,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Ionic Capacity',
    text: ionicCapacities.map(getWarning),
    hoverinfo: 'text+x+y',
  };

  const totalYieldData = {
    x: dates,
    y: totalYields,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Total Yield',
    text: totalYields.map(getWarning),
    hoverinfo: 'text+x+y',
  };

  return (
    <div>
      <Plot
        data={[
          exclusionLimitData,
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
          flowSpecData,
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
          ionicCapacityData,
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
          totalYieldData,
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
