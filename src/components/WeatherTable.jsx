import React, { useState } from "react";

export default function WeatherTable({
                                       data,
                                       sortBy,
                                       toggleSort,
                                       onUpdate,
                                       onDelete,
                                     }) {
  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState(null);

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "4px 6px",
    textAlign: "center",
  };

  const thStyle = {
    border: "1px solid #bbb",
    padding: "4px 8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const btnStyle = {
    padding: "2px 6px",
    fontSize: "14px",
    cursor: "pointer",
  };

  const inputStyle = {
    width: "70px",
    padding: "2px",
    textAlign: "center",
  };

  const startEdit = (row) => {
    setEditId(row.id);
    setEditRow({
      ...row,
      time: new Date(row.time).toISOString().slice(0, 16),
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditRow(null);
  };

  const saveEdit = () => {
    const updated = {
      ...editRow,
      time: new Date(editRow.time).toISOString(),
    };
    onUpdate(editId, updated);
    cancelEdit();
  };

  const handleChange = (field, value) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
      <table style={{ width: "60%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
        <tr>
          {[
            ["time", "Time"],
            ["temperature", "Temp"],
            ["rain", "Rain"],
            ["surface_pressure", "Pressure"],
            ["wind_speed", "Wind"],
          ].map(([key, label]) => (
            <th
              key={key}
              style={thStyle}
              onClick={() => toggleSort(key)}
            >
              {label}{" "}
              {sortBy.key === key ? (sortBy.dir === "asc" ? "▲" : "▼") : ""}
            </th>
          ))}

          <th style={thStyle}>
            <img src="/edit.svg" alt="Edit" width="16" height="16" />
          </th>
          <th style={thStyle}>
            <img src="/delete.svg" alt="Delete" width="16" height="16" />
          </th>
        </tr>
        </thead>

        <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={8} style={{ ...cellStyle, textAlign: "center" }}>
              No data
            </td>
          </tr>
        ) : (
          data.map((row) => {
            const isEditing = editId === row.id;
            return (
              <tr key={row.id}>
                <td style={cellStyle}>
                  {isEditing ? (
                    <input
                      type="datetime-local"
                      value={editRow.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      style={{ ...inputStyle, width: "150px" }}
                    />
                  ) : (
                    row.time.toLocaleString()
                  )}
                </td>
                <td style={cellStyle}>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editRow.temperature}
                      onChange={(e) =>
                        handleChange("temperature", Number(e.target.value))
                      }
                      style={inputStyle}
                    />
                  ) : (
                    `${row.temperature} ${row.temperature_unit}`
                  )}
                </td>
                <td style={cellStyle}>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editRow.rain}
                      onChange={(e) =>
                        handleChange("rain", Number(e.target.value))
                      }
                      style={inputStyle}
                    />
                  ) : (
                    `${row.rain} ${row.rain_unit}`
                  )}
                </td>
                <td style={cellStyle}>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editRow.surface_pressure}
                      onChange={(e) =>
                        handleChange("surface_pressure", Number(e.target.value))
                      }
                      style={inputStyle}
                    />
                  ) : (
                    `${row.surface_pressure} ${row.surface_pressure_unit}`
                  )}
                </td>
                <td style={cellStyle}>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editRow.wind_speed}
                      onChange={(e) =>
                        handleChange("wind_speed", Number(e.target.value))
                      }
                      style={inputStyle}
                    />
                  ) : (
                    `${row.wind_speed} ${row.wind_speed_unit}`
                  )}
                </td>

                <td style={cellStyle}>
                  {isEditing ? (
                    <>
                      <button onClick={saveEdit} style={btnStyle}>
                        <img src="/save.svg" alt="Save" width="16" height="16" />
                      </button>
                      <button onClick={cancelEdit} style={btnStyle}>
                        <img src="/stop.svg" alt="Cancel" width="16" height="16" />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(row)} style={btnStyle}>
                      <img src="/edit.svg" alt="Edit" width="16" height="16" />
                    </button>
                  )}
                </td>
                <td style={cellStyle}>
                  <button
                    onClick={() => onDelete(row.id)}
                    style={{ ...btnStyle, color: "red" }}>
                    <img src="/delete.svg" alt="Delete" width="16" height="16" />
                  </button>
                </td>
              </tr>
            );
          })
        )}
        </tbody>
      </table>
    </div>
  );
}
