import React, { useMemo, useState } from 'react';
import WeatherTable from './WeatherTable';
import { Pagination } from './Pagination.jsx';
import { apiUpdateRow } from '../hooks/useUpdate.js';
import { apiDeleteRow } from '../hooks/useDelete.js';

export default function PagedWeatherTable({ data, sortBy, toggleSort, pageNum, setPageNum, pageSize, setPageSize, totalItems }) {
  return (
    <div>
      <WeatherTable
        data={data}
        sortBy={sortBy}
        toggleSort={toggleSort}
        onUpdate={(id, updated) => apiUpdateRow(id, updated)}
        onDelete={(id) => apiDeleteRow(id)}
      />
      <Pagination pageNum={pageNum} setPageNum={setPageNum} pageSize={pageSize} setPageSize={setPageSize} totalItems={totalItems}  />
    </div>
  );
}
