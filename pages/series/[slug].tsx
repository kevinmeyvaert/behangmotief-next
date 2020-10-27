import type { InferGetStaticPropsType } from 'next';
import { FC, useEffect, useState } from 'react';
import { contentfulRequest } from '../../lib/api';
import AlbumHeader from '../../components/AlbumHeader';
import AlbumMobileHeader from '../../components/AlbumMobileHeader';
import Navigation from '../../components/Navigation';
import { NAVIGATION, SERIE } from '../../queries/contentful';
import BlockNewsPaper from '../../components/blocks/BlockNewsPaper';

const SeriesPage: FC<InferGetStaticPropsType<typeof getServerSideProps>> = ({
  serie,
  navigationItems,
}) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const handleScroll = async () => {
      if (window.scrollY > 75 && !isDark) {
        setIsDark(true);
      } else if (window.scrollY < 75 && isDark) {
        setIsDark(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  if (!serie) return null;
  return (
    <>
      <main className={isDark ? 'themed-main isDark' : 'themed-main isLight'}>
        <Navigation items={navigationItems} />
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
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  const { pagesCollection } = await contentfulRequest({ query: SERIE, variables: { slug } });
  const [serie] = pagesCollection.items;

  const { navigation } = await contentfulRequest({ query: NAVIGATION });
  const navigationItems = navigation.pageCollection.items;

  return { props: { serie, navigationItems } };
};

export default SeriesPage;
