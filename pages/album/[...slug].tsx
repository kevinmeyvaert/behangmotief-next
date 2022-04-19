import { useColorMode } from '@chakra-ui/color-mode';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Center, Container, Flex } from '@chakra-ui/layout';
import { Button, IconButton } from '@chakra-ui/react';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
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
  const { artist, venue, images, thumbnail, date } = post;
  const { stickyRef, isSticky } = useIsSticky();
  const { setColorMode } = useColorMode();

  const filteredImages = images.filter((i) => i.photographer.firstName === 'Kevin');

  useEffect(() => {
    setColorMode(isSticky ? 'dark' : 'light');
  }, [isSticky]);

  return (
    <>
      <Head>
        <title>{`${artist.name} | ${venue.name} - Behangmotief`}</title>
        <meta
          name="description"
          content={`Photos taken at the ${artist.name} show at ${venue.name}.`}
        />

        <meta property="og:title" content={`${artist.name} | ${venue.name}`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`Photos taken at the ${artist.name} show at ${venue.name}.`}
        />
        <meta property="og:image" content={thumbnail.resized} />

        <meta name="twitter:title" content={`${artist.name} | ${venue.name}`} />
        <meta
          name="twitter:description"
          content={`Photos taken at the ${artist.name} show at ${venue.name}.`}
        />
        <meta name="twitter:image" content={thumbnail.resized} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container maxW="container.xl">
        <Box as="header">
          <Flex gap={2} mt={4} justify="start">
            <form action="/">
              <Button
                leftIcon={<ArrowBackIcon color="black" />}
                aria-label="Back"
                type="submit"
                variant="unstyled"
              >
                Back
              </Button>
            </form>
          </Flex>
        </Box>
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
        <section className="c-row">
          <div className="o-container">
            <Masonry
              breakpointCols={{
                default: 2,
                640: 1,
              }}
              className="c-masonry"
              columnClassName="c-masonry--grid-column"
            >
              {filteredImages.map((photo, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Box as="figure" key={index} className="c-album--photo-item" mb={6}>
                  <LazyImage
                    src={photo.hires}
                    blurhash={photo.blurhash}
                    alt={artist.name}
                    dimensions={photo.dimensions}
                    sizes="(min-width: 73.75em) calc(80% * 73.75em)"
                    srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${photo.hires} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${photo.hires} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${photo.hires} 800w, https://r.wannabes.be/S=W400,H400,PD2/${photo.hires} 400w`}
                  />
                </Box>
              ))}
            </Masonry>
          </div>
        </section>
      </Container>
      <Footer />
    </>
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
