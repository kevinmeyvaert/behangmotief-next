import { FC } from 'react';
import Logo from './Logo';

interface Props {
  artist: string;
  venue: string;
  isDark: boolean;
  date: string;
}

const AlbumHeader: FC<Props> = ({ artist, venue, isDark, date }) => {
  return (
    <section className="c-row c-row--sticky c-album-header">
      <div className="o-container o-flex o-flex--horizontal o-align-center o-justify-space-between">
        <h2 className="c-header--wrap o-justify-start c-album--title">{artist}</h2>
        <Logo
          title="Behangmotief"
          link="/"
          isDark={isDark}
          style={{ flex: 1 }}
          className="c-header--wrap o-justify-center"
        />
        <p className="c-header--wrap o-justify-end c-album--meta">
          {venue} | {new Date(date).toLocaleDateString('be-NL')}
        </p>
      </div>
    </section>
  );
};

export default AlbumHeader;
