import { useState, useEffect } from "react";
import { getAllBikes } from "../services/bikeService";

/**
 * Fetches bikes whenever `filters` changes.
 * Pages use this hook instead of calling bikeService directly,
 * keeping data-fetching logic out of component bodies.
 */
const useBikes = (filters = {}) => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serialize filters so the effect only re-runs when values actually change.
  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getAllBikes(filters)
      .then((data) => {
        if (!cancelled) {
          setBikes(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  return { bikes, loading, error };
};

export default useBikes;
