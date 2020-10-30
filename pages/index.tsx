import request from 'graphql-request';
import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Masonry from 'react-masonry-css';
import type { InferGetStaticPropsType } from 'next';
import Slider from 'react-slick';

import { contentfulRequest, WANNABES_API_ENDPOINT } from '../lib/api';
import { POSTS } from '../queries/wannabes';
import type { SearchQuery } from '../types/wannabes.types';
import MasonryItem from '../components/MasonryItem';
import Navigation from '../components/Navigation';
import { NAVIGATION, RANDOM_SPREADS } from '../queries/contentful';
import BlockNewsPaper from '../components/blocks/BlockNewsPaper';
import Footer from '../components/Footer';
import useDarkMode from '../hooks/useDarkMode';

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  spreads,
  navigationItems,
}) => {
  const router = useRouter();
  const isDark = useDarkMode();

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
  };

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
        <Navigation items={navigationItems} isDark={isDark} />
        <section className="c-row">
          <div className="o-container c-slider">
            <Slider {...settings}>
              {spreads.map((spread) => (
                <BlockNewsPaper contentBlock={spread} single key={spread.spreadTitle} />
              ))}
            </Slider>
          </div>
          <div className="o-container  o-flex o-align-center o-justify-end">
            <button
              className="c-home--button"
              onClick={() => router.push('/series/2020').then(() => window.scrollTo(0, 0))}
            >
              See all 2020 highlights →
            </button>
          </div>
        </section>
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
              {posts.map((post) => (
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
            <div className="o-container o-flex o-align-center o-justify-end">
              <button
                className="c-home--button"
                onClick={() => router.push('/wannabes').then(() => window.scrollTo(0, 0))}
              >
                See all recent albums →
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const { posts }: SearchQuery = await request(WANNABES_API_ENDPOINT, POSTS, {
    start: 0,
    limit: 6,
  });
  const { randomSpreads } = await contentfulRequest({ query: RANDOM_SPREADS });
  const spreads = randomSpreads.items;
  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items;
  return { props: { posts: posts.data, spreads, navigationItems }, revalidate: 1800 };
};

export default Home;
