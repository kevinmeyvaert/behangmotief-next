import { FC } from 'react';
import Logo from './Logo';

interface Props {
  artist: string;
  venue?: string;
  date?: string;
  isDark: boolean;
}

const AlbumMobileHeader: FC<Props> = ({ artist, venue, date, isDark }) => {
  return (
    <>
      <section className="c-row c-row--sticky c-album-mobile-header">
        <Logo
          title="Behangmotief"
          link="/"
          isDark={isDark}
          style={{
            flex: 1,
            alignSelf: 'center',
            marginBottom: '20px',
            '--scroll': !isDark ? 1 : 0.5,
          }}
          className="c-header--wrap o-justify-center"
        />
      </section>
      <section className="c-row c-album-mobile-header">
        <div className="o-container o-flex o-flex--vertical o-align-start o-justify-center">
          <h2 className="o-justify-start c-album--title">{artist}</h2>
          {date && venue ? <p className="o-justify-end c-album--meta">
            {venue} | {new Date(date).toLocaleDateString('be-NL')}
          </p> : null}
        </div>
      </section>
    </>
  );
};

export default AlbumMobileHeader;
