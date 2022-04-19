import { useColorMode } from '@chakra-ui/color-mode';
import { InfoIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Container, Flex, Heading, HStack } from '@chakra-ui/layout';
import {
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Masonry from 'react-masonry-css';
import { InfiniteData } from 'react-query';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../components/Logo';
import MasonryItem from '../components/MasonryItem';
import useDebouncedValue from '../hooks/useDebounce';
import useIsSticky from '../hooks/useIsSticky';
import { usePagedAlbums } from '../hooks/usePagedAlbums';
import { fetcher } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebouncedValue(searchInput);
  const { albums, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } =
    usePagedAlbums({
      initialData,
      searchInput,
    });
  const { setColorMode } = useColorMode();
  const { stickyRef, isSticky } = useIsSticky();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const endReached = useCallback(() => {
    fetchNextPage({
      pageParam: albums.length,
    });
  }, [fetchNextPage, albums]);

  const [infiniteRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage,
    onLoadMore: endReached,
    rootMargin: '0px 0px 400px 0px',
  });

  useEffect(() => {
    setSearchInput(Array.isArray(router.query.q) ? router.query.q[0] : router.query.q || '');
  }, []);

  useEffect(() => {
    setColorMode(isSticky ? 'dark' : 'light');
  }, [isSticky]);

  useEffect(() => {
    refetch();
  }, [debouncedSearchInput]);

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();
      refetch();
    },
    [refetch],
  );

  return (
    <>
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

      <Container maxW="container.2xl">
        <Header
          onSubmitSearch={handleOnSubmit}
          onSetSearchInput={setSearchInput}
          onOpenSideBar={onOpen}
          searchInput={searchInput}
        />
        <Center
          height="56"
          position="sticky"
          top={0}
          zIndex="overlay"
          pointerEvents="none"
          ref={stickyRef}
        >
          <Box transition="0.3s" width={isSticky ? '65px' : '95px'}>
            <Logo />
          </Box>
        </Center>
        <Masonry
          breakpointCols={{
            default: 3,
            768: 2,
            640: 1,
          }}
          className="c-masonry"
          columnClassName="c-masonry--grid-column"
        >
          {albums.map((post) => (
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
      <Drawer onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent bg="black" color="white">
          <DrawerHeader>
            <HStack justify="space-between">
              <Heading>12800 ISO and giving 0 fucks.</Heading>
              <CloseButton onClick={onClose} />
            </HStack>
          </DrawerHeader>
          <DrawerBody>hey</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const getStaticProps = async () => {
  const initialPosts = await fetcher<SearchQuery>(POSTS, {
    start: 0,
    limit: 15,
  });
  const initialInfiniteData = { pages: [initialPosts] } as InfiniteData<SearchQuery>;
  return { props: { initialData: initialInfiniteData }, revalidate: 60 };
};

export default Home;
