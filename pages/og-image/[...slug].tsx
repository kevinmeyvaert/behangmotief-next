import { Box, Center, Heading } from '@chakra-ui/layout';
import type { InferGetStaticPropsType } from 'next';
import { FC } from 'react';

import { fetcher } from '../../lib/api';
import { ALBUM, ALBUM_PATHS } from '../../queries/wannabes';
import { AlbumQuery, GetAlbumPathsQuery } from '../../types/wannabes.types';

const OgImage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  return (
    <Center background="black" p={5}>
      <Box width={1024} height={630} position="relative">
        <Heading
          lineHeight={0.8}
          ml={4}
          mb="-0.25em"
          fontSize="6xl"
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
            top={'0.25em'}
            lineHeight={0.8}
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
            {post.artist.name}
          </Heading>
          <img src={`https://r.wannabes.be/S=W1600,H1600/${post.thumbnail.resized}`} />
        </Box>
      </Box>
    </Center>
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
