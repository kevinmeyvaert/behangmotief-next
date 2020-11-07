import { FC } from 'react';
import Head from 'next/head';
import type { InferGetStaticPropsType } from 'next';

import { contentfulRequest } from '../lib/api';
import Navigation from '../components/Navigation';
import { NAVIGATION, PAGE } from '../queries/contentful';
import Footer from '../components/Footer';
import BlockNewsPaper from '../components/blocks/BlockNewsPaper';
import BlockText from '../components/blocks/BlockText';
import BlockDuoPhoto from '../components/blocks/BlockDuoPhoto';
import Image from 'next/image';

const About: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ page, navigationItems }) => {
  return (
    <>
      <main className="themed-main isLight">
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
        <Navigation items={navigationItems} isDark={false} />
        <section className="c-row">
          <div className="o-container">
            <Image
              sizes="(max-width: 48em) calc(100vw - 3rem), (min-width: 90em) calc(100vw - 6rem), calc(90em - 6rem)"
              src={page.pageImage.url}
              alt="Kevin Meyvaert"
              loading="eager"
              width={page.pageImage.width}
              height={page.pageImage.height}
            />
          </div>
        </section>
        <section className="c-row">
          <div className="o-container">
            {page.contentBlocksCollection.items.map((contentBlock) => {
              switch (contentBlock.__typename) {
                case 'BlockText':
                  return <BlockText contentBlock={contentBlock} key={contentBlock.id} />;
                case 'BlockDuoPhoto':
                  return <BlockDuoPhoto contentBlock={contentBlock} key={contentBlock.id} />;
                case 'BlockNewsPaper':
                  return <BlockNewsPaper contentBlock={contentBlock} key={contentBlock.id} />;
                default:
                  return null;
              }
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const { page } = await contentfulRequest({
    query: PAGE,
    variables: { id: '4NRslbg5z2idfu35byoeEu' },
  });
  const navigationItems = navigation.pageCollection.items;
  return { props: { page, navigationItems }, revalidate: 1800 };
};

export default About;
