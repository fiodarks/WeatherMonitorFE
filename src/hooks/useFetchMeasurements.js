import { useEffect, useState } from "react";
import { parseData } from "../utils/dateUtils";

export default function useFetchMeasurements(startDate, endDate, initialPage = 1, initialSize = 10) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) return;
    let mounted = true;
    setLoading(true);
    setError(null);

    const qs = new URLSearchParams({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      sort_by: "timestamp:asc",
    });

    fetch(`https://weathermonitorbe.onrender.com/api/weather/measurements/chart-data?${qs.toString()}`)
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
  }, [startDate?.toISOString(), endDate?.toISOString()]);

  return { data, loading, error };
}
