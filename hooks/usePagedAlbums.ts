import { useMemo } from 'react';
import { InfiniteData, useInfiniteQuery } from 'react-query';

import { fetcher } from '../lib/api';
import { filterOwnAlbums } from '../lib/helpers';
import { POSTS } from '../queries/wannabes';
import { Post, SearchQuery } from '../types/wannabes.types';

const STALE_30_MINUTES = 1800000;

export const usePagedAlbums = ({
  pageSize = 15,
  initialData,
}: {
  pageSize?: number;
  initialData: InfiniteData<SearchQuery>;
}) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery<
    Awaited<SearchQuery>
  >(
    'albums',
    ({ pageParam = 0 }) =>
      fetcher(POSTS, {
        start: pageParam,
        limit: pageSize,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalFetchedDocuments = allPages.flatMap((page) => page.posts.data).length;
        const nextPageParam =
          totalFetchedDocuments < lastPage.posts.pagination.total
            ? allPages.length * pageSize + 1
            : undefined;
        return nextPageParam;
      },
      staleTime: STALE_30_MINUTES,
      initialData,
    },
  );

  const allAlbums = useMemo(
    () => filterOwnAlbums(data?.pages.flatMap((page) => page.posts.data) as Post[]),
    [data?.pages],
  );

  return {
    albums: allAlbums,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
