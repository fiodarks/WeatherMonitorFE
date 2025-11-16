import React, { useState } from 'react';

export default function AddMeasurementForm({ onAdd }) {
  const [form, setForm] = useState({
    temperature: '',
    is_day: true,
    rain: '',
    surface_pressure: '',
    wind_speed: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isValidNumber = value => !isNaN(value) && value !== '';

  const canSubmit =
    isValidNumber(form.temperature) &&
    isValidNumber(form.rain) &&
    isValidNumber(form.surface_pressure) &&
    isValidNumber(form.wind_speed);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        city: 'Warsaw',
        temperature: form.temperature,
        temperature_unit: '°C',
        is_day: form.is_day,
        rain: form.rain,
        rain_unit: 'mm',
        surface_pressure: form.surface_pressure,
        surface_pressure_unit: 'hPa',
        wind_speed: form.wind_speed,
        wind_speed_unit: 'km/h',
      }).toString();

      const res = await fetch(
        `https://limited-joleen-fiodarks-5b0af2c2.koyeb.app/api/weather/measurements?${params}`,
        { method: 'POST' }
      );

      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const newMeasurement = await res.json();
      if (!newMeasurement.time) newMeasurement.time = new Date().toUTCString();

      onAdd(newMeasurement);

      setForm({
        temperature: '',
        is_day: true,
        rain: '',
        surface_pressure: '',
        wind_speed: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: '10px 0',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <span>City: Warsaw</span>

      <input
        name="temperature"
        type="number"
        placeholder="Temp"
        value={form.temperature}
        onChange={handleChange}
        style={{ width: '60px' }}
      />
      <span>°C</span>

      <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <input type="checkbox" name="is_day" checked={form.is_day} onChange={handleChange} />
        Is a day
      </label>

      <input
        name="rain"
        type="number"
        placeholder="Rain"
        value={form.rain}
        onChange={handleChange}
        style={{ width: '60px' }}
      />
      <span>mm</span>

      <input
        name="surface_pressure"
        type="number"
        placeholder="Pressure"
        value={form.surface_pressure}
        onChange={handleChange}
        style={{ width: '70px' }}
      />
      <span>hPa</span>

      <input
        name="wind_speed"
        type="number"
        placeholder="Wind"
        value={form.wind_speed}
        onChange={handleChange}
        style={{ width: '60px' }}
      />
      <span>km/h</span>

      <button
        type="submit"
        disabled={loading || !canSubmit}
        style={{
          opacity: loading || !canSubmit ? 0.5 : 1,
          transition: 'opacity 0.2s',
          padding: '4px 8px',
        }}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>

      {error && <span style={{ color: 'red' }}>{error}</span>}
    </form>
  );
}
