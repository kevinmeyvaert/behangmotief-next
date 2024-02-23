import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetcher } from '../lib/api';
import { filterOwnAlbums } from '../lib/helpers';
import { POSTS } from '../queries/wannabes';
import { Post, SearchQuery } from '../types/wannabes.types';

const STALE_30_MINUTES = 1800000;

export const usePagedAlbums = ({
  pageSize = 15,
  searchInput,
  key,
}: {
  pageSize?: number;
  searchInput?: string;
  key: string;
}) => {
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch, isFetching } =
    useInfiniteQuery<Awaited<SearchQuery>>({
      queryKey: [key],
      queryFn: ({ pageParam }) =>
        fetcher(POSTS, {
          start: pageParam,
          limit: pageSize,
          all: searchInput,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const totalFetchedDocuments = allPages.flatMap((page) => page.posts.data).length;
        const nextPageParam =
          totalFetchedDocuments < lastPage.posts.pagination.total
            ? allPages.length * pageSize + 1
            : undefined;
        return nextPageParam;
      },
      staleTime: STALE_30_MINUTES,
      initialData: () => {
        const initPosts = queryClient.getQueryState(['posts'])?.data;
        if (initPosts) {
          return {
            pageParams: [undefined],
            pages: [initPosts],
          };
        }
      },
    });

  const allAlbums = useMemo(
    () => filterOwnAlbums(data?.pages.flatMap((page) => page.posts.data) as Post[]),
    [data?.pages],
  );

  return {
    albums: allAlbums,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};
