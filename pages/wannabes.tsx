import { useSWRInfinite } from 'swr';
import request from 'graphql-request';
import { FC } from 'react';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import type { InferGetStaticPropsType } from 'next';

import { contentfulRequest, WANNABES_API_ENDPOINT } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';
import MasonryItem from '../components/MasonryItem';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import useEndlessScroll from '../hooks/useEndlessScroll';
import { loadingStatus } from '../lib/helpers';
import { NAVIGATION } from '../queries/contentful';
import Footer from '../components/Footer';
import useDarkMode from '../hooks/useDarkMode';

const NUMBER_OF_POSTS = 15;

const Wannabes: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  initialData,
  navigationItems,
}) => {
  const isDark = useDarkMode();
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => {
      return [POSTS, index * NUMBER_OF_POSTS, NUMBER_OF_POSTS];
    },
    (query, start, limit) => {
      return request(WANNABES_API_ENDPOINT, query, {
        start,
        limit,
      });
    },
    { initialData, revalidateOnFocus: false },
  );

  const canLoadMore = size * NUMBER_OF_POSTS < initialData[0].posts.pagination.total;
  const [, isLoadingMore] = loadingStatus(data, error, size);
  useEndlessScroll(size, setSize, isLoadingMore, 1000, canLoadMore);

  const posts = data.reduce((acc, page) => [...acc, ...page.posts.data.map((post) => post)], []);
  const updatedPosts = posts.map(p => {
    if (p.thumbnail.photographer.firstName !== 'Kevin') {
      const kevThumbnail = p.images.filter(i => i.photographer.firstName === 'Kevin')[0]
      return {
        ...p, thumbnail: {
          blurhash: kevThumbnail.blurhash,
          hires: kevThumbnail.resized,
        }
      }
    } else {
      return p
    }
  });
  return (
    <>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
        <Head>
          <title>Wannabes - Behangmotief</title>
          <meta
            name="description"
            content="Behangmotief / Kevin Meyvaert's concert- and festivalphoto portfolio website."
          />
          <link rel="shortcut icon" href="favicon.png" />
          <meta property="og:title" content="BEHANGMOTIEF" />
          <meta property="og:site_name" content="BEHANGMOTIEF" />
          <meta property="og:url" content="http://behangmotief.be/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Behangmotief / Kevin Meyvaert's concert- and festivalphoto portfolio website."
          />
          <meta property="og:image" content="http://behangmotief.be/og.jpg" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="http://behangmotief.be/" />
          <meta name="twitter:title" content="BEHANGMOTIEF" />
          <meta name="twitter:image" content="http://behangmotief.be/og.jpg" />
        </Head>
        <Navigation items={navigationItems} isDark={isDark} />
        <section className="c-row">
          <div className="o-container">
            <Masonry
              breakpointCols={{
                default: 3,
                700: 2,
                500: 1,
              }}
              className="c-masonry"
              columnClassName="c-masonry--grid-column"
            >
              {updatedPosts.map((post) => (
                <MasonryItem
                  src={post.thumbnail.hires}
                  artist={post.artist.name}
                  venue={post.venue.name}
                  slug={post.slug}
                  key={post.slug}
                  dimensions={post.thumbnail?.dimensions}
                  blurhash={post.thumbnail.blurhash}
                />
              ))}
            </Masonry>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const initialPosts: SearchQuery = await request(WANNABES_API_ENDPOINT, POSTS, {
    start: 0,
    limit: NUMBER_OF_POSTS,
  });
  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items;
  return { props: { initialData: [initialPosts], navigationItems }, revalidate: 1800 };
};

export default Wannabes;
