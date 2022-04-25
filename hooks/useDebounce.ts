import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay = 250) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useDebouncedValue = (searchText: string, ms = 500) => {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  useDebounce(
    () => {
      setDebouncedSearchValue(searchText);
    },
    ms,
    [searchText],
  );
  return debouncedSearchValue;
};

export default useDebouncedValue;
