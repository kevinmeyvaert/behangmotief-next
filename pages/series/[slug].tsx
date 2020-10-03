import Head from 'next/head';
import request from 'graphql-request';
import type { InferGetStaticPropsType } from 'next';
import { FC, useEffect, useState } from 'react';
import { datoRequest, WANNABES_API_ENDPOINT } from '../../lib/api';
import { ALBUM, ALBUM_PATHS } from '../../queries/wannabes';
import type { AlbumQuery, SearchQuery } from '../../types/wannabes.types';
import AlbumHeader from '../../components/AlbumHeader';
import AlbumMobileHeader from '../../components/AlbumMobileHeader';
import LazyImage from '../../components/LazyImage';
import Navigation from '../../components/Navigation';
import { NAVIGATION, SERIE, SERIES_PATHS } from '../../queries/dato';

const SeriesPage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ serie, navigation }) => {
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

  if (!serie) return null;
  const { title, description, photos } = serie;
  return (
    <>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
        {/* <Head>
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
        </Head> */}
        <Navigation items={navigation.items} />
        <AlbumMobileHeader
          artist={title}
          isDark={isDark}
          scrollY={scroll}
        />
        <AlbumHeader artist={title} isDark={isDark} />
        <section className="c-row">
          <div className="o-container">
            <ul className="o-list c-album">
              {photos.map((photo, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} className="c-album--photo-item">
                  <LazyImage
                    src={photo.hires}
                    lowQualitySrc={`${photo.url}?h=20&w=20`}
                    alt={title}
                    sizes="(min-width: 73.75em) calc(80% * 73.75em)"
                    srcSet={`${photo.url}?h=1066&w=1600 1600w, ${photo.url}?h=800&w=1200 1200w, ${photo.url}?h=533&w=800 800w, ${photo.url}?h=266&w=400 400w`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const { serie } = await datoRequest({
    query: SERIE,
    variables: { slug }
  });
  const { navigation } = await datoRequest({
    query: NAVIGATION,
  });

  return { props: { serie, navigation }, revalidate: 1800 };
};

export const getStaticPaths = async () => {
  const { seriesPaths } = await datoRequest({
    query: SERIES_PATHS,
  });

  return {
    paths: seriesPaths.map((slug) => `/series/${slug}`),
    fallback: true,
  };
};

export default SeriesPage;
