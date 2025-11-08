import { useEffect, useState } from "react";
import { formatDateInput, parseData } from '../utils/dateUtils';

export default function useFetchMeasurements(startDate, endDate, refreshKey = true, initialPage = 1, initialSize = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    const qs = new URLSearchParams({
      start_date: formatDateInput(startDate),
      end_date: formatDateInput(endDate),
      sort_by: "timestamp:asc",
    });

    fetch(`https://limited-joleen-fiodarks-5b0af2c2.koyeb.app/api/weather/measurements/chart-data?${qs.toString()}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if(mounted) {
          setData(parseData(json))
        }
      })
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [startDate, endDate, refreshKey]);

  return { data, setData,  loading, error };
}
