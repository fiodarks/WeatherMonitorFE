import React, { useEffect, useMemo, useState } from 'react';
import { groupByCity } from '../utils/dateUtils';
import useFetchMeasurements from '../hooks/useFetchMeasurements';
import CityCharts from '../components/CityCharts';
import TimeRangeControls from '../components/TimeRangeControls';
import PagedWeatherTable from '../components/PagedWeatherTable';
import AddMeasurementForm from './AddMeasurementForm.jsx';
import RefreshButton from './RefreshButton.jsx';

export default function WeatherDashboard() {
  const { now, past } = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    const past = new Date();
    past.setDate(past.getDate() - 7);
    past.setHours(0, 0, 0, 0);
    return { now, past };
  }, []);

  const [start, setStart] = useState(past);
  const [end, setEnd] = useState(now);
  const [refreshKey, setRefreshKey] = useState(true);
  const { data, setData, loading, error } = useFetchMeasurements(start, end, refreshKey);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (pageNum > totalPages) setPageNum(totalPages);
  }, [pageNum, totalPages]);

  useEffect(() => {
    const maxPages = Math.max(1, totalPages);
    if (pageNum > maxPages) setPageNum(maxPages);
  }, [pageNum, pageSize, totalPages]);

  const [sortBy, setSortBy] = useState({ key: '_time', dir: 'desc' });

  const sortedData = useMemo(() => {
    const arr = data.slice();
    const { key, dir } = sortBy;
    arr.sort((a, b) => {
      let va = a[key], vb = b[key];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (va instanceof Date && vb instanceof Date)
        return dir === 'asc' ? va - vb : vb - va;
      if (typeof va === 'string')
        return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return dir === 'asc' ? va - vb : vb - va;
    });
    setTotalItems(arr.length);
    return arr;
  }, [data, sortBy, start, end]);

  const paginated = useMemo(() => {
    const startIdx = (pageNum - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    return sortedData.slice(startIdx, endIdx);
  }, [sortedData, pageNum, pageSize]);

  const handleAddMeasurement = newItem => {
    setRefreshKey(k => !k);
  };

  const cities = useMemo(() => groupByCity(data), [data]);

  useEffect(() => {
    setPageNum(1);
  }, [start, end]);

  const toggleSort = key =>
    setSortBy(s => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));

  return (
    <div>
      <h1>Weather Dashboard</h1>

      <CityCharts dataByCity={cities} />
      <AddMeasurementForm onAdd={handleAddMeasurement} />
      <TimeRangeControls start={start} end={end} setStart={setStart} setEnd={setEnd} loading={loading} error={error} />
      <RefreshButton onRefresh={handleAddMeasurement}/>
      <PagedWeatherTable
        data={paginated}
        sortBy={sortBy}
        toggleSort={toggleSort}
        pageNum={pageNum}
        setPageNum={setPageNum}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={totalItems}
      />
    </div>
  );
}
