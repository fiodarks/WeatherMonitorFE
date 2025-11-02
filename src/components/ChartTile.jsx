import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ChartTile({ title, data, dataKey }) {
  const formatted = data.map((d) => ({
    ...d,
    tsLabel: new Date(d.timestamp).toLocaleString(),
  }));
  return (
    <div className="p-2 border rounded min-h-[16rem]">
      <div className="text-sm font-medium mb-2">{title}</div>
      <ResponsiveContainer width="100%" aspect={2} minHeight={250}>
        <LineChart data={formatted} margin={{ top: 5, right: 18, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tsLabel" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip labelFormatter={(v) => v} />
          <Line type="monotone" dataKey={dataKey} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
