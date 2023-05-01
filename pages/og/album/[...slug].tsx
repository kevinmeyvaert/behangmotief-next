import { Box, Center, chakra, Heading, Text, useColorMode } from '@chakra-ui/react';
import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { FC, useEffect } from 'react';

import Logo from '../../../components/Logo';
import { fetcher } from '../../../lib/api';
import { ALBUM, ALBUM_PATHS } from '../../../queries/wannabes';
import { AlbumQuery, GetAlbumPathsQuery } from '../../../types/wannabes.types';

const OgImage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  const { setColorMode } = useColorMode();
  const date = new Date(post.date);
  const day = date.getDate();
  const month = date.getUTCMonth();
  const year = date.getFullYear();

  const location = post.event ? post.event.name : post.venue.name;

  useEffect(() => {
    setColorMode('dark');
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Center background="black" p={10} height="100vh">
        <Box width={1024} height={630} position="relative" mt={10}>
          <Text ml={5} color="white" size="xl">
            <chakra.span fontWeight="bold" fontSize="20px">
              {location}
            </chakra.span>{' '}
            &mdash; {`${day}/${month + 1}/${year}`}
          </Text>
          <Heading
            lineHeight={0.8}
            ml={4}
            mb="-0.45em"
            fontSize="9xl"
            letterSpacing={'-1px'}
            textTransform="uppercase"
            color="white"
          >
            {post.artist.name}
          </Heading>

          <Box position="absolute" overflow="hidden">
            <Heading
              zIndex="overlay"
              position="absolute"
              ml={4}
              transform="translateY(-100%)"
              top={'0.45em'}
              lineHeight={0.8}
              color="white"
              fontSize="9xl"
              sx={{
                '-webkit-text-fill-color': 'transparent',
                '-webkit-text-stroke-width': '1px',
                '-webkit-text-stroke-color': 'white',
              }}
              letterSpacing="-1px"
              textTransform="uppercase"
              wordBreak="break-word"
            >
              {post.artist.name}
            </Heading>
            <img src={`https://r.wannabes.be/S=W1600,H1600/${post.thumbnail.resized}`} />
          </Box>
          <Box position="absolute" width="15%" right="30" bottom="61px">
            <Logo color="white" />
          </Box>
        </Box>
      </Center>
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

export default OgImage;
