import { useEffect, useState } from "react";
import { debounce } from "lodash";

function useDebounce<T>(value: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const setDebounce = (newValue: T) => {
    debounce(
      (newValue) => {
        setDebouncedValue(newValue);
      },
      delay || 500,
      {
        leading: true,
        trailing: false,
      }
    );
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
