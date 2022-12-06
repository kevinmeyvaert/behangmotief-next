import { Box, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import LazyImage from '../components/LazyImage';
import { usePositionStore } from '../pages';
import { Artist, Dimensions, Image, Post, Venue } from '../types/wannabes.types';

interface Props {
  src: string;
  artist: Artist['name'];
  venue: Venue['name'];
  slug: Post['slug'];
  dimensions: Dimensions;
  blurhash: Image['blurhash'];
  event?: Post['event']['name'];
}

const MasonryItem: FC<Props> = ({ src, artist, venue, event, slug, dimensions, blurhash }) => {
  const setPosition = usePositionStore((state) => state.setPosition);
  return (
    <Box
      role="group"
      position="relative"
      overflow="hidden"
      transition="0.3s"
      boxShadow="0 18px 36px -18px rgba(0, 0, 0, 0.33)"
      mb={6}
      _hover={{
        transform: 'translateY(-10px)',
        boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.3)',
      }}
      _focusWithin={{
        transform: 'translateY(-10px)',
        boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.3)',
        h2: {
          opacity: 1,
        },
      }}
      as="article"
      cursor="pointer"
    >
      <Link href="/album/[...slug]" as={`/album/${slug}`}>
        <a onClick={() => setPosition(window.pageYOffset)}>
          <LazyImage
            srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${src} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${src} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${src} 800w, https://r.wannabes.be/S=W400,H400,PD2/${src} 400w`}
            sizes="(min-width: 90em) 25vw, (min-width: 73.75em) 33vw, (min-width: 35.5em) 50vw, 100vw"
            src={`https://r.wannabes.be/S=W800,H800,PD2/${src}`}
            alt={artist}
            dimensions={dimensions}
            blurhash={blurhash}
          />
          <Heading
            as="h2"
            fontSize={{ base: '14px', xl: '16px' }}
            position="absolute"
            textAlign="center"
            width="100%"
            bottom={0}
            transition="0.3s"
            opacity={{ base: 1, xl: 0 }}
            color="white"
            p={2}
            background="linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))"
            _groupHover={{ opacity: 1 }}
          >
            {`${artist} at ${event ? event : venue}`}
          </Heading>
        </a>
      </Link>
    </Box>
  );
};

export default MasonryItem;
