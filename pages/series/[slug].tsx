import type { InferGetStaticPropsType } from 'next';
import { FC } from 'react';
import { contentfulRequest } from '../../lib/api';
import AlbumHeader from '../../components/AlbumHeader';
import AlbumMobileHeader from '../../components/AlbumMobileHeader';
import Navigation from '../../components/Navigation';
import { NAVIGATION, SERIE } from '../../queries/contentful';
import BlockNewsPaper from '../../components/blocks/BlockNewsPaper';
import Head from 'next/head';
import Footer from '../../components/Footer';
import useDarkMode from '../../hooks/useDarkMode';

const SeriesPage: FC<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  serie,
  navigationItems,
}) => {
  const isDark = useDarkMode();

  if (!serie) return null;
  return (
    <>
      <Head>
        <title>{`${serie.title} - Behangmotief`}</title>
        <meta name="description" content={`${serie.title}, a series of photos`} />
        <meta property="og:image" content="website" />
        <meta property="og:title" content={`${serie.title} - Behangmotief`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={serie.pageImage?.url} />
        <meta property="og:description" content={`${serie.title}, a series of photos`} />
        <meta name="twitter:title" content={`${serie.title} - Behangmotief`} />
        <meta name="twitter:description" content={`${serie.title}, a series of photos`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
        <Navigation items={navigationItems} isDark={isDark} />
        <AlbumMobileHeader artist={serie.title} isDark={isDark} />
        <AlbumHeader artist={serie.title} isDark={isDark} />
        <section className="c-row">
          <div className="o-container">
            {serie.contentBlocksCollection.items.map((contentBlock, i) => {
              return <BlockNewsPaper contentBlock={contentBlock} key={`${i}+${serie.title}`} />;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  let serie;

  const { pagesCollection } = await contentfulRequest({ query: SERIE, variables: { slug } });
  const [page] = pagesCollection.items;

  const { contentBlocksCollection } = page;
  serie = page;

  // Contentfull query complexity hack
  if (contentBlocksCollection.items.length === 25) {
    const { pagesCollection: extraPagesCollection } = await contentfulRequest({
      query: SERIE,
      variables: { slug, skip: 25 },
    });
    const [extraPage] = extraPagesCollection.items;
    const { contentBlocksCollection: extraContentBlocksCollection, ...rest } = extraPage;

    serie = {
      ...rest,
      contentBlocksCollection: {
        items: [...contentBlocksCollection.items, ...extraContentBlocksCollection.items],
      },
    };
  }

  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items;

  return { props: { serie, navigationItems } };
};

export default SeriesPage;
