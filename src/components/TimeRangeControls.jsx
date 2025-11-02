import React from 'react';
import { formatISOToLocalInput } from '../utils/dateUtils';

export default function TimeRangeControls({ start, end, setStart, setEnd, loading, error }) {
  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <label>
        Start:
        <input
          type="datetime-local"
          value={formatISOToLocalInput(start)}
          onChange={e => setStart(new Date(e.target.value))}
          style={{ marginLeft: 8 }}
        />
      </label>
      <label style={{ marginLeft: 16 }}>
        End:
        <input
          type="datetime-local"
          value={formatISOToLocalInput(end)}
          onChange={e => setEnd(new Date(e.target.value))}
          style={{ marginLeft: 8 }}
        />
      </label>
      {loading && <span style={{ marginLeft: 16 }}>Loading...</span>}
      {error && <span style={{ color: "red", marginLeft: 16 }}>Error: {error}</span>}
    </div>
  );
}
