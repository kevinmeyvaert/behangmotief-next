import {
  Box,
  Center,
  CloseButton,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  SlideFade,
  Spinner,
  Tag,
  Text,
  useColorMode,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Masonry from 'react-masonry-css';
import { create } from 'zustand';

import Footer from '../components/Footer';
import Header from '../components/Header';
import MasonryItem from '../components/MasonryItem';
import useDebouncedValue from '../hooks/useDebounce';
import { usePagedAlbums } from '../hooks/usePagedAlbums';
import { fetcher } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';

export const usePositionStore = create<{
  position: number;
  setPosition: (position: number) => void;
}>((set) => ({
  position: 0,
  setPosition: (position) => set({ position }),
}));

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearchInput = useDebouncedValue(searchInput);
  const { albums, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    usePagedAlbums({
      key: 'albums',
    });
  const {
    albums: searchAlbums,
    isFetching: isFetchingSearch,
    isLoading: isLoadingSearch,
    refetch,
  } = usePagedAlbums({
    searchInput,
    key: 'search',
  });
  const { setColorMode } = useColorMode();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const position = usePositionStore((state) => state.position);
  useEffect(() => {
    if (position !== 0) {
      window.scrollTo({ top: position });
    }
  }, []);

  const hasAlbums = albums?.length > 0;

  const endReached = useCallback(() => {
    fetchNextPage();
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
    setColorMode('light');
  }, []);

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

  const referrals = [
    'Democrazy',
    'Crammerock',
    'Studio Brussel',
    'Cactusfestival',
    'HEAR HEAR',
    'Pukkelpop',
    'Boomtown',
    'Gladiolen',
    'VI.BE',
    'Gent Jazz',
  ];

  return (
    <SlideFade in key={router.asPath} offsetY="20px" transition={{ enter: { duration: 0.3 } }}>
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
          onSubmitSearch={handleOnSubmit}
          onSetSearchInput={setSearchInput}
          onOpenSideBar={onOpen}
          searchInput={searchInput}
          isFetchingSearch={isFetchingSearch && !isLoadingSearch}
          albums={searchAlbums}
        />
      </Box>
      <Container maxW="container.2xl" as="main">
        {!hasAlbums && !isFetching && debouncedSearchInput !== '' && (
          <Center>
            <Heading textAlign="center">
              No results were found for "{debouncedSearchInput}". :(
            </Heading>
          </Center>
        )}
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
      <Drawer onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent bg="black" color="white">
          <DrawerHeader>
            <HStack justify="flex-end">
              <CloseButton onClick={onClose} _focus={{ outlineColor: 'white' }} />
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <Box width="100%" overflow={'hidden'}>
              <Box
                margin="0 auto"
                backgroundImage="/profile-sprites-sm.jpg"
                backgroundSize="cover"
                width="400px"
                height="500px"
                animation="profile-picture 0.9s steps(6) infinite"
              />
            </Box>
            <Text lineHeight="2" mb={5} mt={10}>
              Belgian freelance concert- &amp; festivalphotographer based in Gent. Part of Wannabes,
              a rockphotography collective.
            </Text>
            <Heading as="h3" fontSize="xl" mb={4}>
              Contact
            </Heading>
            <Text lineHeight="2" mb={5}>
              hallo@behangmotief.be
            </Text>
            <Heading as="h3" fontSize="xl" mb={4}>
              Referrals
            </Heading>
            <Wrap spacing={2} mb={4}>
              {referrals.map((referral) => (
                <WrapItem key={referral}>
                  <Tag size="lg">{referral}</Tag>
                </WrapItem>
              ))}
            </Wrap>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
