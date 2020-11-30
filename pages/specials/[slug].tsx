import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';
import { FC } from 'react';
import { contentfulRequest } from '../../lib/api';
import AlbumHeader from '../../components/AlbumHeader';
import AlbumMobileHeader from '../../components/AlbumMobileHeader';
import Navigation from '../../components/Navigation';
import Masonry from 'react-masonry-css';
import { CONTENTFUL_ALBUM, NAVIGATION } from '../../queries/contentful';
import Footer from '../../components/Footer';
import useDarkMode from '../../hooks/useDarkMode';
import Image from 'next/image';

const SpecialsPage: FC<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  special,
  navigationItems,
}) => {
  const isDark = useDarkMode();

  if (!special) return null;
  const { title, coverPhoto } = special;

  return (
    <>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
        <Head>
          <title>{`${title} - Behangmotief`}</title>
          <meta name="description" content={`Special: ${title}.`} />

          <meta property="og:title" content={`${title}`} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={`Special: ${title}.`} />
          <meta property="og:image" content={coverPhoto.url} />

          <meta name="twitter:title" content={`${title}`} />
          <meta name="twitter:description" content={`Special: ${title}.`} />
          <meta name="twitter:image" content={coverPhoto.url} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Navigation items={navigationItems} isDark={isDark} />
        <AlbumMobileHeader artist={title} isDark={isDark} />
        <AlbumHeader artist={title} isDark={isDark} />
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
              {special.photosCollection.items.map((photo, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <figure key={`${title}_${index}`} className="c-album--photo-item">
                  <Image
                    sizes="(min-width: 73.75em) 650px, (min-width: 768px) calc(50vw), 100vw"
                    src={photo.url}
                    alt={title}
                    unsized
                    loading="lazy"
                  />
                </figure>
              ))}
            </Masonry>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  const { albumsCollection } = await contentfulRequest({
    query: CONTENTFUL_ALBUM,
    variables: { slug },
  });
  const [special] = albumsCollection.items;

  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items;

  return { props: { special, navigationItems } };
};

export default SpecialsPage;
