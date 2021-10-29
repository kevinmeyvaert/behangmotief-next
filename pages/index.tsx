import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { FC } from 'react';
import Masonry from 'react-masonry-css';
import useSWRInfinite from 'swr/infinite';

import Footer from '../components/Footer';
import MasonryItem from '../components/MasonryItem';
import Navigation from '../components/Navigation';
import useDarkMode from '../hooks/useDarkMode';
import useEndlessScroll from '../hooks/useEndlessScroll';
import { fetcher } from '../lib/api';
import { loadingStatus } from '../lib/helpers';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';

const NUMBER_OF_POSTS = 15;

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  const isDark = useDarkMode();
  const { data, error, size, setSize } = useSWRInfinite<SearchQuery>(
    (index) => {
      return [POSTS, index * NUMBER_OF_POSTS, NUMBER_OF_POSTS];
    },
    (query, start, limit) => {
      return fetcher(query, {
        start,
        limit,
      });
    },
  );

  // TODO: figure out SWR defaults
  const dataSwitch = data || initialData;

  const canLoadMore = size * NUMBER_OF_POSTS < initialData[0].posts.pagination.total;
  const [, isLoadingMore] = loadingStatus(data, error, size);
  useEndlessScroll(size, setSize, isLoadingMore, 1000, canLoadMore);

  const posts = dataSwitch.reduce(
    (acc, page) => [...acc, ...page.posts.data.map((post) => post)],
    [],
  );
  const updatedPosts = posts?.map((p) => {
    if (p.thumbnail.photographer.firstName !== 'Kevin') {
      const kevThumbnail = p.images.filter((i) => i.photographer.firstName === 'Kevin')[0];
      return {
        ...p,
        thumbnail: {
          blurhash: kevThumbnail.blurhash,
          hires: kevThumbnail.resized,
        },
      };
    } else {
      return p;
    }
  });

  return (
    <>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
        <Head>
          <title>Behangmotief</title>
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
        <Navigation isDark={isDark} />
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
                  event={post.event?.name}
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
  const initialPosts = await fetcher<SearchQuery>(POSTS, {
    start: 0,
    limit: NUMBER_OF_POSTS,
  });
  return { props: { initialData: [initialPosts] }, revalidate: 60 };
};

export default Home;
