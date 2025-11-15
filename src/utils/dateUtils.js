export const formatDateInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function toWeekRangeNow() {
  const now = new Date();
  const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const nowStr = now.toISOString().split('T')[0]
  const pastStr = past.toISOString().split('T')[0]
  return { nowStr, pastStr };
}

export function parseData(items = []) {
  return items.map((it) => {
    const timeStr = it.time?.endsWith("Z") ? it.time : it.time + "Z";
    return {
      ...it,
      time: new Date(timeStr)
    };
  });
}

export function groupByCity(data) {
  return data.reduce((acc, cur) => {
    (acc[cur.city] ||= []).push(cur);
    return acc;
  }, {});
}
