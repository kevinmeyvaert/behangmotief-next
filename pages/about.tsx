import { FC } from 'react';
import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';

import { datoRequest } from '../lib/api';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { ABOUT, NAVIGATION } from '../queries/dato';
import LazyImage from '../components/LazyImage';

const About: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ about, navigation }) => {
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
      <Navigation items={navigation.items} />
      <section className="c-row">
        <div className="o-container o-flex o-align-center o-justify-center">
          <Logo title="Behangmotief" link="/" />
        </div>
      </section>
      <section className="c-row c-row--flush">
        <LazyImage
          src={about.headerImage.url}
          lowQualitySrc={`${about.headerImage.url}?h=20&w=30`}
          srcSet={`${about.headerImage.url}?h=1066&w=1600 1600w, ${about.headerImage.url}?h=800&w=1200 1200w, ${about.headerImage.url}?h=533&w=800 800w, ${about.headerImage.url}?h=266&w=400 400w`}
          aspectRatio={3 / 2}
          alt="Kevin Meyvaert"
          className="c-page--header-image"
        />
      </section>
      <section className="c-row">
        <div className="o-container">
          <div dangerouslySetInnerHTML={{ __html: about.content[0].content }} />
        </div>
      </section>
    </>
  );
};

export const getStaticProps = async () => {
  const { about } = await datoRequest({
    query: ABOUT,
  });
  const { navigation } = await datoRequest({
    query: NAVIGATION,
  });
  return { props: { about, navigation }, revalidate: 1800 };
};

export default About;
