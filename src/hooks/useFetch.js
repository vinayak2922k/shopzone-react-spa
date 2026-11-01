import { useState, useEffect } from 'react';

/**
 * useFetch Hook Skeleton
 * 
 * PATTERN EXPLANATION:
 * - Manages `data`, `loading`, and `error` states for asynchronous requests.
 * - Uses AbortController inside useEffect cleanup to prevent memory leaks and race conditions on unmount.
 * 
 * @param {string} url - API endpoint to fetch
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    // TODO [USER IMPLEMENTATION]:
    // 1. Fetch url with signal: controller.signal
    // 2. Check if response is ok (throw Error if not)
    // 3. Parse json and set data
    // 4. Catch errors (ignoring AbortError) and set error state
    // 5. Finally set loading to false

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data (status ${res.status})`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred');
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
}

