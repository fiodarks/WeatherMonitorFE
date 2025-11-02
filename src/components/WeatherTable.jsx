import React from "react";

export default function WeatherTable({ data, sortBy, toggleSort }) {
  return (
    <div align={'center'}>
      <table style={{ width: "50%" }}>
        <thead>
        <tr>
          {[
            ["time", "Time"],
            ["city", "City"],
            ["temperature", "Temp"],
            ["rain", "Rain"],
            ["surface_pressure", "Pressure"],
            ["wind_speed", "Wind"],
          ].map(([key, label]) => (
            <th style={{ border: "2px solid #ccc", padding: "4px 8px" }}
                key={key} onClick={() => toggleSort(key === "time" ? "_time" : key)}>
              {label}{" "}
              {sortBy.key === (key === "time" ? "_time" : key)
                ? sortBy.dir === "asc" ? "▲" : "▼"
                : ""}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", border: "1px solid #ccc", padding: "8px" }}>
              No data
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={row.id}>
              <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row._time.toLocaleString()}</td>
              <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row.city}</td>
              <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row.temperature} {row.temperature_unit}</td>
              <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row.rain} {row.rain_unit}</td>
              <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row.surface_pressure} {row.surface_pressure_unit}</td>
              <td style={{ border: "1px solid #ccc", padding: "4px 8px" }}>{row.wind_speed} {row.wind_speed_unit}</td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
}

