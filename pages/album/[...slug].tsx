import Head from 'next/head';
import request from 'graphql-request';
import type { InferGetStaticPropsType } from 'next';
import { FC, useEffect, useState } from 'react';
import { contentfulRequest, WANNABES_API_ENDPOINT } from '../../lib/api';
import { ALBUM, ALBUM_PATHS } from '../../queries/wannabes';
import type { AlbumQuery, SearchQuery } from '../../types/wannabes.types';
import AlbumHeader from '../../components/AlbumHeader';
import AlbumMobileHeader from '../../components/AlbumMobileHeader';
import LazyImage from '../../components/LazyImage';
import Navigation from '../../components/Navigation';
import Masonry from 'react-masonry-css';
import { NAVIGATION } from '../../queries/contentful';

const fetcher = (query: string, slug: string) => request(WANNABES_API_ENDPOINT, query, { slug });

const AlbumPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, navigationItems }) => {
  const [isDark, setIsDark] = useState(false);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const handleScroll = async () => {
      setScroll(window.scrollY);
      if (window.scrollY >= 75) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  if (!post) return null;
  const { artist, venue, images, thumbnail, date } = post;
  
  return (
    <>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
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
        <Navigation items={navigationItems} />
        <AlbumMobileHeader
          artist={artist.name}
          venue={venue.name}
          isDark={isDark}
          date={date}
          scrollY={scroll}
        />
        <AlbumHeader artist={artist.name} venue={venue.name} isDark={isDark} date={date} />
        <section className="c-row">
          <div className="o-container">
          <Masonry
            breakpointCols={{
              default: 2,
              768: 1,
            }}
            className="c-masonry c-masonry--gutter"
            columnClassName="c-masonry--grid-column  c-masonry--grid-column--gutter"
          >
              {images.map((photo, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <figure key={index} className="c-album--photo-item">
                  <LazyImage
                    src={photo.hires}
                    blurhash={photo.blurhash}
                    alt={artist.name}
                    dimensions={photo.dimensions}
                    sizes="(min-width: 73.75em) calc(80% * 73.75em)"
                    srcSet={`https://r.wannabes.be/S=W1600,H1600,PD2/${photo.hires} 1600w, https://r.wannabes.be/S=W1200,H1200,PD2/${photo.hires} 1200w, https://r.wannabes.be/S=W800,H800,PD2/${photo.hires} 800w, https://r.wannabes.be/S=W400,H400,PD2/${photo.hires} 400w`}
                  />
                </figure>
              ))}
            </Masonry>
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const mergeSlug = Array.isArray(slug) ? slug?.join('/') : slug;

  const { post }: { post: AlbumQuery['post'] } = await fetcher(ALBUM, mergeSlug);
  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items; 

  return { props: { post, navigationItems }, revalidate: 1800 };
};

export const getStaticPaths = async () => {
  const albums: SearchQuery = await request(WANNABES_API_ENDPOINT, ALBUM_PATHS);
  const paths = albums.posts.data;

  return {
    paths: paths.map((slug) => `/album/${slug}`),
    fallback: true,
  };
};

export default AlbumPage;
