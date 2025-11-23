import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = DEFAULT_DEBOUNCED_TIME_MS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const DEFAULT_DEBOUNCED_TIME_MS = 500;
