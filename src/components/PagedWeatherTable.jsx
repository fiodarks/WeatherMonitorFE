import React, { useMemo, useState } from 'react';
import WeatherTable from './WeatherTable';
import { Pagination } from './Pagination.jsx';

export default function PagedWeatherTable({ data, sortBy, toggleSort, pageNum, setPageNum, pageSize, setPageSize, totalItems }) {
  return (
    <div>
      <WeatherTable data={data} sortBy={sortBy} toggleSort={toggleSort} />
      <Pagination pageNum={pageNum} setPageNum={setPageNum} pageSize={pageSize} setPageSize={setPageSize} totalItems={totalItems}  />
    </div>
  );
}
