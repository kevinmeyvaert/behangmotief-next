import { useCallback, useEffect, useState } from 'react';

import useDebouncedValue from './useDebounce';
import { usePagedAlbums } from './usePagedAlbums';

export const useSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebouncedValue(searchInput);

  const {
    albums: searchAlbums,
    isFetching: isFetchingSearch,
    isLoading: isLoadingSearch,
    refetch: refetchSearch,
  } = usePagedAlbums({
    searchInput: debouncedSearchInput,
    key: 'search',
  });

  useEffect(() => {
    refetchSearch();
  }, [debouncedSearchInput]);

  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      refetchSearch();
    },
    [refetchSearch],
  );

  return {
    setSearchInput,
    searchInput,
    onSubmitSearch,
    searchAlbums,
    isFetchingSearch,
    isLoadingSearch,
  };
};
