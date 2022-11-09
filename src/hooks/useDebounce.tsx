import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const setDebounce = (newValue: T) => {
    setTimeout(() => setDebouncedValue(newValue), delay || 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue, setDebounce };
}

export default useDebounce;
