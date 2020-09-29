import { LazyLoadImage } from 'react-lazy-load-image-component';
import Head from 'next/head';
import request from 'graphql-request';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { FC } from 'react';
import { WANNABES_API_ENDPOINT } from '../../lib/api';
import { ALBUM, ALBUM_PATHS } from '../../queries/wannabes';
import Logo from '../../components/Logo';
import type { AlbumQuery, SearchQuery } from '../../types/wannabes.types';

interface Props {
  post: AlbumQuery['post'];
}

const fetcher = (query: string, slug: string) => request(WANNABES_API_ENDPOINT, query, { slug });

const AlbumPage: FC<Props> = ({ post }) => {
  if (!post) return null;
  const { artist, venue, images, thumbnail, thumbs, date } = post;
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
      <section className="c-row c-row--flush">
        <div className="o-container o-flex o-align-center o-justify-center">
          <Logo title="Behangmotief" link="/" />
        </div>
      </section>
      <section className="c-row">
        <div className="o-container o-flex o-flex--vertical o-align-center o-justify-center">
          <h2 className="c-album--title">{artist.name}</h2>
          <p className="c-album--meta">
            {venue.name} | {new Date(date).toLocaleDateString('be-NL')}
          </p>
        </div>
      </section>
      <section className="c-row">
        <div className="o-container">
          <ul className="o-list c-album">
            {images.map((photo, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className="c-album--photo-item">
                <LazyLoadImage
                  visibleByDefault={index <= 1}
                  alt={artist.name}
                  sizes="(min-width: 73.75em) calc(80% * 73.75em)"
                  srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${photo.hires} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${photo.hires} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${photo.hires} 800w, https://r.wannabes.be/S=W400,H400,PD2/${photo.hires} 400w`}
                  src={photo.hires}
                  effect="blur"
                  placeholderSrc={thumbs[index].resized}
                  style={{ maxWidth: '100%' }}
                  threshold={500}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const mergeSlug = Array.isArray(slug) ? slug?.join('/') : slug;

  const { post }: { post: AlbumQuery['post'] } = await fetcher(ALBUM, mergeSlug);
  return { props: { post }, revalidate: 1800 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const albums: SearchQuery = await request(WANNABES_API_ENDPOINT, ALBUM_PATHS);
  const paths = albums.posts.data;

  return {
    paths: paths.map((slug) => `/album/${slug}`),
    fallback: true,
  };
};

export default AlbumPage;
