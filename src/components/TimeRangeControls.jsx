import { formatDateInput } from '../utils/dateUtils.js';

export default function TimeRangeControls({ start, end, setStart, setEnd, loading, error }) {

  // ensure start at 00:00:00 local
  const handleStartChange = (e) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    setStart(newDate);
  };

  // ensure end at 23:59:59 local
  const handleEndChange = (e) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newDate = new Date(year, month - 1, day, 23, 59, 59, 999);
    setEnd(newDate);
  };

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <label>
        Start:
        <input
          type="date"
          value={formatDateInput(start)}
          onChange={handleStartChange}
          style={{ marginLeft: 8 }}
        />
      </label>
      <label style={{ marginLeft: 16 }}>
        End:
        <input
          type="date"
          value={formatDateInput(end)}
          onChange={handleEndChange}
          style={{ marginLeft: 8 }}
        />
      </label>
      {loading && <span style={{ marginLeft: 16 }}>Loading...</span>}
      {error && <span style={{ color: "red", marginLeft: 16 }}>Error: {error}</span>}
    </div>
  );
}
