import { useColorMode } from '@chakra-ui/color-mode';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button, chakra, SlideFade } from '@chakra-ui/react';
import { Fade } from '@chakra-ui/transition';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Masonry from 'react-masonry-css';

import Footer from '../../components/Footer';
import LazyImage from '../../components/LazyImage';
import Logo from '../../components/Logo';
import useIsSticky from '../../hooks/useIsSticky';
import { fetcher } from '../../lib/api';
import { ALBUM, ALBUM_PATHS } from '../../queries/wannabes';
import { AlbumQuery, GetAlbumPathsQuery } from '../../types/wannabes.types';

const AlbumPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  const { artist, venue, images, date, event } = post;
  const { stickyRef, isSticky } = useIsSticky();
  const { setColorMode } = useColorMode();
  const router = useRouter();

  const { slug } = router.query;
  const mergeSlug = slug?.join('/');

  const filteredImages = images.filter((i) => i.photographer.firstName === 'Kevin');
  const location = event ? event.name : venue.name;

  useEffect(() => {
    setColorMode(isSticky ? 'dark' : 'light');
  }, [isSticky]);

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <SlideFade in key={router.asPath} offsetY="20px" transition={{ enter: { duration: 0.3 } }}>
      <Head>
        <title>{`${artist.name} | ${location} - Behangmotief`}</title>
        <meta
          name="description"
          content={`Photos taken at the ${artist.name} show at ${location}.`}
        />

        <meta property="og:title" content={`${artist.name} | ${location}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`Photos taken at the ${artist.name} show at ${location}.`}
        />
        <meta property="og:image" content={`https://behangmotief.be/api/og/album/${mergeSlug}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${artist.name} | ${location}`} />
        <meta
          name="twitter:description"
          content={`Photos taken at the ${artist.name} show at ${location}.`}
        />
        <meta name="twitter:site" content="@behangmotief" />
        <meta
          name="twitter:image:src"
          content={`https://behangmotief.be/api/og/album/${mergeSlug}`}
        />
      </Head>
      <Container maxW="container.xl" as="header">
          <Flex gap={2} mt={4} justify="start">
            <form action="/">
              <Button
                leftIcon={<ArrowBackIcon color="black" />}
                aria-label="Back"
                type="submit"
                variant="unstyled"
                onClick={handleBackClick}
                _hover={{
                  transform: 'translateY(3px)',
                }}
              >
                Back
              </Button>
            </form>
          </Flex>
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
        </Container>
        <Container maxW="container.xl" position="relative" as="main">
          <Fade in transition={{ enter: { duration: 0.5 } }}>
            <Text ml={5} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
              <chakra.span fontWeight="bold" fontSize="20px">
                {location}
              </chakra.span>{' '}
              &mdash; {new Date(date).toLocaleDateString('be-NL')}
            </Text>
            <Heading
              lineHeight={0.8}
              ml={4}
              mb="-0.25em"
              fontSize="6xl"
              letterSpacing={'-1px'}
              textTransform="uppercase"
            >
              {artist.name}
            </Heading>
          </Fade>
          <Masonry
            breakpointCols={{
              default: 2,
              640: 1,
            }}
            className="c-masonry"
            columnClassName="c-masonry--grid-column"
          >
            <Box position="absolute" zIndex="overlay" overflow="hidden" top={0}>
              <Heading
                ml={4}
                lineHeight={0.8}
                mt="0.5em"
                color="white"
                fontSize="6xl"
                sx={{
                  '-webkit-text-fill-color': 'transparent',
                  '-webkit-text-stroke-width': '1px',
                  '-webkit-text-stroke-color': 'white',
                }}
                letterSpacing="-1px"
                textTransform="uppercase"
                wordBreak="break-word"
              >
                {artist.name}
              </Heading>
            </Box>
            {filteredImages.map((photo, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box as="figure" key={index} className="c-album--photo-item" mb={6}>
                <LazyImage
                  errorContainerStyle={{ marginBottom: `calc(var(--chakra-space-6) * -1)`, visibility: "hidden" }}
                  src={photo.hires}
                  blurhash={photo.blurhash}
                  alt={artist.name}
                  dimensions={photo.dimensions}
                  sizes="(min-width: 73.75em) calc(80% * 73.75em)"
                  srcSet={`https://r.wannabes.be/S=W1600,H1600/${photo.hires} 1600w, https://r.wannabes.be/S=W1200,H1200/${photo.hires} 1200w, https://r.wannabes.be/S=W800,H800/${photo.hires} 800w, https://r.wannabes.be/S=W400,H400/${photo.hires} 400w`}
                />
              </Box>
            ))}
          </Masonry>
      </Container>
      <Footer />
    </SlideFade>
  );
};

export async function getStaticPaths() {
  const res = await fetcher<GetAlbumPathsQuery>(ALBUM_PATHS);
  const paths = res.posts.data.map((post) => ({
    params: { slug: post.slug.split('/') },
  }));
  return { paths, fallback: 'blocking' };
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const mergeSlug = Array.isArray(slug) ? slug?.join('/') : slug;
  const { post } = await fetcher<AlbumQuery>(ALBUM, { slug: mergeSlug });
  return { props: { post }, revalidate: 60 };
};

export default AlbumPage;
