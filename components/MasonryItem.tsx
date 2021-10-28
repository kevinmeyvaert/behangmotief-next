/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import { FC } from 'react';

import LazyImage from '../components/LazyImage';
import { Artist, Dimensions, Image, Post, Venue } from '../types/wannabes.types';

interface Props {
  src: string;
  artist: Artist['name'];
  venue: Venue['name'];
  slug: Post['slug'];
  dimensions: Dimensions;
  blurhash: Image['blurhash'];
  event?: Post['event'];
}

const MasonryItem: FC<Props> = ({ src, artist, venue, event, slug, dimensions, blurhash }) => {
  return (
    <div className="c-masonry--item">
      <Link href="/album/[...slug]" as={`/album/${slug}`}>
        <a>
          <LazyImage
            srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${src} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${src} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${src} 800w, https://r.wannabes.be/S=W400,H400,PD2/${src} 400w`}
            sizes="(min-width: 90em) 25vw, (min-width: 73.75em) 33vw, (min-width: 35.5em) 50vw, 100vw"
            src={`https://r.wannabes.be/S=W800,H800,PD2/${src}`}
            alt={artist}
            dimensions={dimensions}
            blurhash={blurhash}
          />
        </a>
      </Link>
      <p>{`${artist} at ${event ? event : venue}`}</p>
    </div>
  );
};

export default MasonryItem;
