import { FC } from 'react';
import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';

import { contentfulRequest, datoRequest } from '../lib/api';
import Navigation from '../components/Navigation';
import { ABOUT } from '../queries/dato';
import LazyImage from '../components/LazyImage';
import { NAVIGATION } from '../queries/contentful';
import Footer from '../components/Footer';
import useDarkMode from '../hooks/useDarkMode';

const About: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ about, navigationItems }) => {
  const isDark = useDarkMode();

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
          <div className="o-container">
            <LazyImage
              src={about.headerImage.url}
              blurhash={about.headerImage.blurhash}
              srcSet={`${about.headerImage.url}?h=1066&w=1600 1600w, ${about.headerImage.url}?h=800&w=1200 1200w, ${about.headerImage.url}?h=533&w=800 800w, ${about.headerImage.url}?h=266&w=400 400w`}
              alt="Kevin Meyvaert"
              dimensions={{ width: about.headerImage.width, height: about.headerImage.height }}
            />
          </div>
        </section>
        <section className="c-row">
          <div className="o-container">
            <div dangerouslySetInnerHTML={{ __html: about.content[0].content }} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const { about } = await datoRequest({
    query: ABOUT,
  });
  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items;
  return { props: { about, navigationItems }, revalidate: 1800 };
};

export default About;
