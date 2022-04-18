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
      <section className="c-row c-album-mobile-header">
        <div className="o-container o-flex o-flex--vertical o-align-start o-justify-center">
          <h2 className="o-justify-start c-album--title">{artist}</h2>
          {date && venue ? (
            <p className="o-justify-end c-album--meta">
              {venue} | {new Date(date).toLocaleDateString('be-NL')}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default AlbumMobileHeader;
