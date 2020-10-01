/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from 'next/link';
import { FC, useState } from 'react';
import { Artist, Dimensions, Post, Venue } from '../types/wannabes.types';

interface Props {
  src: string;
  artist: Artist['name'];
  venue: Venue['name'];
  slug: Post['slug'];
}

const MasonryItem: FC<Props> = ({ src, artist, venue, slug }) => {
  const [loaded, setLoaded] = useState(false);
  const handleFallbackImage = (e) => (e.target.src = '/placeholder.jpg');
  return (
  <div className="c-masonry--item">
    <Link href="/album/[...slug]" as={`/album/${slug}`}>
      <a>
        {!loaded && <img src={`https://r.wannabes.be/S=W10,H10,PD2/${src}`} aria-hidden="true" style={{ width: "100%", filter: "blur(5px)" }}/>}
        <img
        loading="lazy"
        srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${src} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${src} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${src} 800w, https://r.wannabes.be/S=W400,H400,PD2/${src} 400w`}
        sizes="(min-width: 90em) 25vw, (min-width: 73.75em) 33vw, (min-width: 35.5em) 50vw, 100vw"
        src={`https://r.wannabes.be/S=W800,H800,PD2/${src}`}
        alt={artist}
        onError={handleFallbackImage}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, position: loaded ? 'relative' : 'absolute' }}
      />
      </a>
    </Link>
    <p>{`${artist} at ${venue}`}</p>
  </div>
)};

export default MasonryItem;
