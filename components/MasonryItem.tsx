/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import type { FC } from 'react';
import { Artist, Dimensions, Post, Venue } from '../types/wannabes.types';
import OverviewImage from './OverviewImage';

interface Props {
  src: string;
  artist: Artist['name'];
  venue: Venue['name'];
  slug: Post['slug'];
  dimensions: Dimensions;
}

const MasonryItem: FC<Props> = ({ src, artist, venue, slug, dimensions }) => (
  <div className="c-masonry--item">
    <Link href="/album/[...slug]" as={`/album/${slug}`}>
      <a>
        <OverviewImage
          src={`https://r.wannabes.be/S=W800,H800,PD2/${src}`}
          srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${src} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${src} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${src} 800w, https://r.wannabes.be/S=W400,H400,PD2/${src} 400w`}
          alt={artist}
          dimensions={dimensions}
        />
      </a>
    </Link>
    <p>{`${artist} at ${venue}`}</p>
  </div>
);

export default MasonryItem;
