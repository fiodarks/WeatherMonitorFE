import React, { useMemo } from 'react';
import ChartTile from './ChartTile';

export default function CityCharts({ dataByCity }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      {Object.entries(dataByCity).map(([city, items]) => {
        const sorted = items.slice().sort((a, b) => a._time - b._time);
        const chartData = sorted.map(i => {
          const date = i._time || i.time;
          return {
            timestamp: new Date(date).toISOString(),
            temperature: i.temperature,
            rain: i.rain,
            surface_pressure: i.surface_pressure,
            wind_speed: i.wind_speed,
          };
        });

        return (
          <div key={city} style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
            <h2>{city}</h2>
            <div className="chart-wrapper">
              <ChartTile title={`Temperature (${items[0]?.temperature_unit || "°C"})`} data={chartData} dataKey="temperature" />
              <ChartTile title={`Rain (${items[0]?.rain_unit || "mm"})`} data={chartData} dataKey="rain" />
              <ChartTile title={`Pressure (${items[0]?.surface_pressure_unit || "hPa"})`} data={chartData} dataKey="surface_pressure" />
              <ChartTile title={`Wind (${items[0]?.wind_speed_unit || "km/h"})`} data={chartData} dataKey="wind_speed" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
