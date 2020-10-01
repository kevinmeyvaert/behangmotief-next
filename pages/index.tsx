import { useSWRInfinite } from 'swr';
import request from 'graphql-request';
import { FC, useEffect } from 'react';
import Head from 'next/head';
import Masonry from 'react-masonry-css';
import type { InferGetStaticPropsType } from 'next';

import { WANNABES_API_ENDPOINT } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';
import MasonryItem from '../components/MasonryItem';
import Logo from '../components/Logo';

const NUMBER_OF_POSTS = 20;

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ initialData }) => {
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
    { initialData },
  );
  const isLoadingInitialData = !data && !error && !data;
  const isLoadingMore =
    isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  // 🐁 Handle endless scroll
  useEffect(() => {
    const handleScroll = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isLoadingMore) {
        setSize(size + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  const posts = data.reduce((acc, page) =>
  [...acc, ...page.posts.data.map((post) => post)], []);
  return (
    <>
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
      <section className="c-row">
        <div className="o-container o-flex o-align-center o-justify-center">
          <Logo title="Behangmotief" link="/" />
        </div>
      </section>
      <section className="c-row">
        <div className="o-container">
          {(!isLoadingInitialData && (
            <Masonry
            breakpointCols={3}
            className="c-masonry"
            columnClassName="c-masonry--grid-column">
              
              {posts.map((post) => (
                  <MasonryItem
                    src={post.thumbnail.hires}
                    artist={post.artist.name}
                    venue={post.venue.name}
                    slug={post.slug}
                    key={post.slug}
                    dimensions={post.thumbnail.dimensions}
                  />
                ))}
            </Masonry>
          )) ||
            null}
        </div>
      </section>
      {(isLoadingMore && <div className="c-masonry--loading">Loading more..</div>) || null}
    </>
  );
};

export const getStaticProps = async () => {
  const initialPosts: SearchQuery = await request(WANNABES_API_ENDPOINT, POSTS, {
    start: 0,
    limit: NUMBER_OF_POSTS,
  });
  return { props: { initialData: [initialPosts] }, revalidate: 1800 };
};

export default Home;
