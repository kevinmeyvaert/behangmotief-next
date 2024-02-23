import { Box, Container, SlideFade, Spinner, useDisclosure } from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { FC, useCallback } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Masonry from 'react-masonry-css';

import { AboutDrawer } from '../components/AboutDrawer';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MasonryItem from '../components/MasonryItem';
import { useSiteDefaultColorMode } from '../hooks/useDefaultColorMode';
import { useResetToPreviousPosition } from '../hooks/useMasonryPosition';
import { usePagedAlbums } from '../hooks/usePagedAlbums';
import { useSearch } from '../hooks/useSearch';
import { fetcher } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  // Albums
  const { albums, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = usePagedAlbums({
    key: 'albums',
  });

  // Search
  const {
    setSearchInput,
    onSubmitSearch,
    searchAlbums,
    isFetchingSearch,
    isLoadingSearch,
    searchInput,
  } = useSearch();

  // UX Hooks
  useSiteDefaultColorMode();
  useResetToPreviousPosition();

  const {
    isOpen: isDrawerOpen,
    onClose: handleCloseDrawer,
    onOpen: handleOpenDrawer,
  } = useDisclosure();

  // Endless scroll
  const endReached = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage, albums]);

  const [infiniteRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage,
    onLoadMore: endReached,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <SlideFade in key="homePage" offsetY="20px" transition={{ enter: { duration: 0.3 } }}>
      <Head>
        <title>Behangmotief</title>
        <meta
          name="description"
          content="Behangmotief / Kevin Meyvaert's concert- and festivalphoto portfolio website."
        />
        <link rel="shortcut icon" href="favicon.png" />
        <meta property="og:title" content="BEHANGMOTIEF" />
        <meta property="og:site_name" content="BEHANGMOTIEF" />
        <meta property="og:url" content="http://behangmotief.be/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Behangmotief / Kevin Meyvaert's concert- and festivalphoto portfolio website."
        />
        <meta property="og:image" content="http://behangmotief.be/og.jpg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="http://behangmotief.be/" />
        <meta name="twitter:title" content="BEHANGMOTIEF" />
        <meta name="twitter:image" content="http://behangmotief.be/og.jpg" />
      </Head>

      <Box as="header" position="relative" display="flex" justifyContent={'flex-end'}>
        <Header
          onSubmitSearch={onSubmitSearch}
          onSetSearchInput={setSearchInput}
          onOpenDrawer={handleOpenDrawer}
          searchInput={searchInput}
          isFetchingSearch={isFetchingSearch && !isLoadingSearch}
          albums={searchAlbums}
        />
      </Box>
      <Container maxW="container.2xl" as="main">
        <Masonry
          breakpointCols={{
            default: 3,
            640: 1,
          }}
          className="c-masonry"
          columnClassName="c-masonry--grid-column"
        >
          {albums?.map((post) => (
            <MasonryItem
              src={post.thumbnail.hires}
              artist={post.artist.name}
              venue={post.venue.name}
              slug={post.slug}
              key={post.slug}
              dimensions={post.thumbnail?.dimensions}
              blurhash={post.thumbnail.blurhash}
              event={post.event?.name}
            />
          ))}
        </Masonry>
        {(!isLoading || hasNextPage) && <div ref={infiniteRef} />}
      </Container>
      {(isLoading || isFetchingNextPage) && (
        <Box position="fixed" zIndex="popover" bottom={4} textAlign="center" width="100%">
          <Spinner />
        </Box>
      )}
      <Footer />
      <AboutDrawer onCloseDrawer={handleCloseDrawer} isDrawerOpen={isDrawerOpen} />
    </SlideFade>
  );
};

export const getStaticProps = async () => {
  const initialPosts = await fetcher<SearchQuery>(POSTS, {
    start: 0,
    limit: 15,
  });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: () => initialPosts });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60,
  };
};

export default Home;
