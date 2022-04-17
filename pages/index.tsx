import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { FC, useCallback } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import Masonry from 'react-masonry-css';
import { InfiniteData } from 'react-query';

import Footer from '../components/Footer';
import MasonryItem from '../components/MasonryItem';
import Navigation from '../components/Navigation';
import useDarkMode from '../hooks/useDarkMode';
import { usePagedAlbums } from '../hooks/usePagedAlbums';
import { fetcher } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
  const isDark = useDarkMode();
  const { albums, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = usePagedAlbums({
    initialData,
  });

  const endReached = useCallback(() => {
    fetchNextPage({
      pageParam: albums.length,
    });
  }, [fetchNextPage, albums]);

  const [infiniteRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage,
    onLoadMore: endReached,
    rootMargin: '400px',
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
              {albums.map((post) => (
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
              {(!isLoading || hasNextPage) && <div ref={infiniteRef} />}
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
    limit: 15,
  });
  const initialInfiniteData = { pages: [initialPosts] } as InfiniteData<SearchQuery>;
  return { props: { initialData: initialInfiniteData }, revalidate: 60 };
};

export default Home;
