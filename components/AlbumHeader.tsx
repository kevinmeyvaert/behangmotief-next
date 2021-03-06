import { FC } from 'react';
import Logo from './Logo';

interface Props {
  artist: string;
  venue?: string;
  isDark: boolean;
  date?: string;
}

const AlbumHeader: FC<Props> = ({ artist, venue, isDark, date }) => {
  return (
    <section className="c-row c-album-header">
      <div className="o-container o-flex o-flex--horizontal o-align-center o-justify-space-between">
        <h2 className="c-header--wrap o-justify-start c-album--title"><span>{venue ? "album" : "serie"}</span>{artist}</h2>
        <p className="c-header--wrap o-justify-end c-album--meta">
          {venue && date ? `${venue} | ${new Date(date).toLocaleDateString('be-NL')}` : null}
        </p>
      </div>
    </section>
  );
};

export default AlbumHeader;
