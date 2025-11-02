// utils/dateUtils.js
export function formatISOToLocalInput(dt) {
  const d = new Date(dt);
  const pad = (n) => String(n).padStart(2, "0");
  const YYYY = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const DD = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
}

export function toWeekRangeNow() {
  const now = new Date();
  const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return { now, past };
}

export function parseData(items = []) {
  return items.map((it) => ({ ...it, _time: new Date(it.time) }));
}

export function groupByCity(data) {
  return data.reduce((acc, cur) => {
    (acc[cur.city] ||= []).push(cur);
    return acc;
  }, {});
}
